import { ChangeDetectionStrategy, Component } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import * as THREE from 'three';
import { ThreeSceneComponent } from '../../three/three-scene.base';

interface AmbientPreset {
  /** 0 = pure cyan, 1 = pure indigo */
  colorMix: number;
  blobScale: number;
  /** 0 = particles at their scattered base position, 1 = collapsed toward the focal point */
  convergence: number;
  networkOpacity: number;
  particleOpacity: number;
}

const CYAN = new THREE.Color(0x00bee8);
const INDIGO = new THREE.Color(0x4b47ff);

const DEFAULT_PRESET: AmbientPreset = {
  colorMix: 0.15,
  blobScale: 1,
  convergence: 0,
  networkOpacity: 0,
  particleOpacity: 0.3,
};

// One preset per main-content section id -- see main-content.component.html.
const PRESETS: Record<string, AmbientPreset> = {
  'about-me': DEFAULT_PRESET,
  skills: {
    colorMix: 0.45,
    blobScale: 0.85,
    convergence: 0.15,
    networkOpacity: 0.2,
    particleOpacity: 0.5,
  },
  portfolio: {
    colorMix: 0.6,
    blobScale: 0.7,
    convergence: 0.25,
    networkOpacity: 0.6,
    particleOpacity: 0.65,
  },
  references: {
    colorMix: 0.3,
    blobScale: 0.9,
    convergence: 0.05,
    networkOpacity: 0,
    particleOpacity: 0.22,
  },
  contact: {
    colorMix: 0.8,
    blobScale: 0.6,
    convergence: 0.85,
    networkOpacity: 0.15,
    particleOpacity: 0.55,
  },
};
const SECTION_IDS = Object.keys(PRESETS);

const PARTICLE_COUNT = 240;
const MAX_LINE_PAIRS = 70;
const CONNECT_DISTANCE = 4.5;

@Component({
  selector: 'app-ambient-background',
  imports: [],
  templateUrl: './ambient-background.component.html',
  styleUrl: './ambient-background.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AmbientBackgroundComponent extends ThreeSceneComponent {
  protected override maxPixelRatio = 1.5;

  private readonly sectionRatios = new Map<string, number>();

  private blobs: THREE.Mesh[] = [];
  private particles!: THREE.Points;
  private network!: THREE.LineSegments;
  private basePositions!: Float32Array;
  private livePositions!: Float32Array;
  private linePairs: Array<[number, number]> = [];

  private current: AmbientPreset = { ...DEFAULT_PRESET };
  private target: AmbientPreset = { ...DEFAULT_PRESET };

  protected override setupScene(
    scene: THREE.Scene,
    camera: THREE.PerspectiveCamera
  ): void {
    camera.position.set(0, 0, 12);

    scene.add(new THREE.AmbientLight(0x334455, 1.6));
    const light = new THREE.PointLight(0xffffff, 6, 40);
    light.position.set(5, 4, 10);
    scene.add(light);

    this.blobs = [
      this.createBlob(1.8, new THREE.Vector3(-3, 1.5, -4)),
      this.createBlob(1.3, new THREE.Vector3(3, -1.8, -5)),
    ];
    this.blobs.forEach((blob) => scene.add(blob));

    this.buildParticleSystem();
    scene.add(this.particles);
    scene.add(this.network);

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return; // e.g. legal-notice/imprint routes don't have these sections
      this.scrollProgress
        .observeRatio(el)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe((ratio) => {
          this.sectionRatios.set(id, ratio);
          this.recomputeTarget();
        });
    });
  }

  protected override onFrame(elapsedSeconds: number, deltaSeconds: number): void {
    const smoothing = 1 - Math.pow(0.02, deltaSeconds);
    this.current.colorMix += (this.target.colorMix - this.current.colorMix) * smoothing;
    this.current.blobScale += (this.target.blobScale - this.current.blobScale) * smoothing;
    this.current.convergence +=
      (this.target.convergence - this.current.convergence) * smoothing;
    this.current.networkOpacity +=
      (this.target.networkOpacity - this.current.networkOpacity) * smoothing;
    this.current.particleOpacity +=
      (this.target.particleOpacity - this.current.particleOpacity) * smoothing;

    const tint = CYAN.clone().lerp(INDIGO, this.current.colorMix);

    this.blobs.forEach((blob, i) => {
      const phase = elapsedSeconds * 0.15 + i * 3;
      blob.rotation.x = elapsedSeconds * 0.03 + i;
      blob.rotation.y = elapsedSeconds * 0.05 + i;
      blob.scale.setScalar(this.current.blobScale * (1 + Math.sin(phase) * 0.03));
      (blob.material as THREE.MeshStandardMaterial).color.copy(tint);
    });

    this.updateParticlePositions();
    const particleMaterial = this.particles.material as THREE.PointsMaterial;
    particleMaterial.color.copy(tint);
    particleMaterial.opacity = this.current.particleOpacity;

    const lineMaterial = this.network.material as THREE.LineBasicMaterial;
    lineMaterial.color.copy(tint);
    lineMaterial.opacity = this.current.networkOpacity;

    this.particles.rotation.y = elapsedSeconds * 0.01;
    this.network.rotation.y = this.particles.rotation.y;
  }

  private recomputeTarget(): void {
    let totalWeight = 0;
    const blended = { colorMix: 0, blobScale: 0, convergence: 0, networkOpacity: 0, particleOpacity: 0 };

    for (const [id, ratio] of this.sectionRatios) {
      if (ratio <= 0) continue;
      const preset = PRESETS[id];
      totalWeight += ratio;
      blended.colorMix += preset.colorMix * ratio;
      blended.blobScale += preset.blobScale * ratio;
      blended.convergence += preset.convergence * ratio;
      blended.networkOpacity += preset.networkOpacity * ratio;
      blended.particleOpacity += preset.particleOpacity * ratio;
    }

    if (totalWeight <= 0) {
      this.target = { ...DEFAULT_PRESET };
      return;
    }

    this.target = {
      colorMix: blended.colorMix / totalWeight,
      blobScale: blended.blobScale / totalWeight,
      convergence: blended.convergence / totalWeight,
      networkOpacity: blended.networkOpacity / totalWeight,
      particleOpacity: blended.particleOpacity / totalWeight,
    };
  }

  private createBlob(radius: number, position: THREE.Vector3): THREE.Mesh {
    const geometry = new THREE.IcosahedronGeometry(radius, 3);
    const material = new THREE.MeshStandardMaterial({
      color: CYAN,
      roughness: 0.4,
      metalness: 0.1,
      transparent: true,
      opacity: 0.28,
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.copy(position);
    return mesh;
  }

  private buildParticleSystem(): void {
    this.basePositions = new Float32Array(PARTICLE_COUNT * 3);
    this.livePositions = new Float32Array(PARTICLE_COUNT * 3);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      this.basePositions[i * 3] = (Math.random() - 0.5) * 22;
      this.basePositions[i * 3 + 1] = (Math.random() - 0.5) * 16;
      this.basePositions[i * 3 + 2] = (Math.random() - 0.5) * 14 - 4;
    }
    this.livePositions.set(this.basePositions);
    this.linePairs = this.computeLinePairs(this.basePositions);

    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute(
      'position',
      new THREE.BufferAttribute(this.livePositions, 3)
    );
    const particleMaterial = new THREE.PointsMaterial({
      size: 0.045,
      color: CYAN,
      transparent: true,
      opacity: DEFAULT_PRESET.particleOpacity,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    this.particles = new THREE.Points(particleGeometry, particleMaterial);

    const linePositions = new Float32Array(this.linePairs.length * 6);
    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
    const lineMaterial = new THREE.LineBasicMaterial({
      color: CYAN,
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending,
    });
    this.network = new THREE.LineSegments(lineGeometry, lineMaterial);
  }

  /** Nearest-neighbor pairs computed once against the scattered base layout. */
  private computeLinePairs(positions: Float32Array): Array<[number, number]> {
    const pairs: Array<[number, number]> = [];
    for (let i = 0; i < PARTICLE_COUNT && pairs.length < MAX_LINE_PAIRS; i++) {
      for (let j = i + 1; j < PARTICLE_COUNT && pairs.length < MAX_LINE_PAIRS; j++) {
        const dx = positions[i * 3] - positions[j * 3];
        const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
        const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
        const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (distance < CONNECT_DISTANCE) {
          pairs.push([i, j]);
        }
      }
    }
    return pairs;
  }

  /** Uniform scale-toward-focal-point -- preserves the relative topology `linePairs` was computed from. */
  private updateParticlePositions(): void {
    const convergence = this.current.convergence;
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const idx = i * 3;
      this.livePositions[idx] = this.basePositions[idx] * (1 - convergence);
      this.livePositions[idx + 1] = this.basePositions[idx + 1] * (1 - convergence);
      this.livePositions[idx + 2] =
        this.basePositions[idx + 2] * (1 - convergence * 0.6) - convergence * 3;
    }
    (this.particles.geometry.attributes['position'] as THREE.BufferAttribute).needsUpdate = true;

    const linePositionAttr = this.network.geometry.attributes['position'] as THREE.BufferAttribute;
    const lineArray = linePositionAttr.array as Float32Array;
    this.linePairs.forEach(([a, b], pairIndex) => {
      const offset = pairIndex * 6;
      lineArray[offset] = this.livePositions[a * 3];
      lineArray[offset + 1] = this.livePositions[a * 3 + 1];
      lineArray[offset + 2] = this.livePositions[a * 3 + 2];
      lineArray[offset + 3] = this.livePositions[b * 3];
      lineArray[offset + 4] = this.livePositions[b * 3 + 1];
      lineArray[offset + 5] = this.livePositions[b * 3 + 2];
    });
    linePositionAttr.needsUpdate = true;
  }
}
