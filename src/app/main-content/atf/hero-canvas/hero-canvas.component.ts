import { Component } from '@angular/core';
import * as THREE from 'three';
import { ThreeSceneComponent } from '../../../shared/three/three-scene.base';

const CYAN = 0x00bee8;
const INDIGO = 0x4b47ff;

@Component({
  selector: 'app-hero-canvas',
  imports: [],
  templateUrl: './hero-canvas.component.html',
  styleUrl: './hero-canvas.component.scss',
})
export class HeroCanvasComponent extends ThreeSceneComponent {
  private readonly blobs: THREE.Mesh[] = [];
  private particles!: THREE.Points;
  private readonly pointer = { x: 0, y: 0 };
  private readonly pointerTarget = { x: 0, y: 0 };
  private pointerTrackingEnabled = false;

  protected override setupScene(
    scene: THREE.Scene,
    camera: THREE.PerspectiveCamera
  ): void {
    camera.position.set(0, 0, 9);

    scene.add(new THREE.AmbientLight(0x334455, 1.4));
    const light = new THREE.PointLight(0xffffff, 8, 30);
    light.position.set(4, 3, 8);
    scene.add(light);

    const colors = [CYAN, INDIGO];
    const blobDefs: Array<{ radius: number; position: THREE.Vector3 }> = [
      { radius: 1.6, position: new THREE.Vector3(-1.6, 0.6, -1) },
      { radius: 1.1, position: new THREE.Vector3(1.8, -0.8, -2) },
      { radius: 0.8, position: new THREE.Vector3(0.4, 1.5, -3) },
    ];

    blobDefs.forEach((def, i) => {
      const geometry = new THREE.IcosahedronGeometry(def.radius, 4);
      const material = new THREE.MeshStandardMaterial({
        color: colors[i % colors.length],
        roughness: 0.35,
        metalness: 0.1,
        transparent: true,
        opacity: 0.5,
      });
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.copy(def.position);
      scene.add(mesh);
      this.blobs.push(mesh);
    });

    this.particles = this.createParticleField(colors);
    scene.add(this.particles);

    this.pointerTrackingEnabled = window.matchMedia('(pointer: fine)').matches;
    if (this.pointerTrackingEnabled) {
      window.addEventListener('pointermove', this.onPointerMove, {
        passive: true,
      });
    }
  }

  protected override onFrame(elapsedSeconds: number): void {
    this.blobs.forEach((blob, i) => {
      const phase = elapsedSeconds * 0.3 + i * 2;
      blob.rotation.x = elapsedSeconds * 0.06 + i;
      blob.rotation.y = elapsedSeconds * 0.09 + i;
      blob.position.y += Math.sin(phase) * 0.0015;
      blob.scale.setScalar(1 + Math.sin(phase * 1.3) * 0.04);
    });

    this.particles.rotation.y = elapsedSeconds * 0.015;

    if (this.pointerTrackingEnabled) {
      this.pointer.x += (this.pointerTarget.x - this.pointer.x) * 0.03;
      this.pointer.y += (this.pointerTarget.y - this.pointer.y) * 0.03;
      this.camera.position.x = this.pointer.x * 0.6;
      this.camera.position.y = -this.pointer.y * 0.4;
      this.camera.lookAt(0, 0, 0);
    }
  }

  protected override onSectionRatio(ratio: number): void {
    this.renderer.domElement.style.opacity = `${Math.min(1, ratio * 1.5)}`;
  }

  override ngOnDestroy(): void {
    if (this.pointerTrackingEnabled) {
      window.removeEventListener('pointermove', this.onPointerMove);
    }
    super.ngOnDestroy();
  }

  private readonly onPointerMove = (event: PointerEvent): void => {
    this.pointerTarget.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.pointerTarget.y = (event.clientY / window.innerHeight) * 2 - 1;
  };

  private createParticleField(colors: number[]): THREE.Points {
    const count = 200;
    const positions = new Float32Array(count * 3);
    const colorAttr = new Float32Array(count * 3);
    const colorA = new THREE.Color(colors[0]);
    const colorB = new THREE.Color(colors[1]);

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 14;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10 - 2;

      const mixed = colorA.clone().lerp(colorB, Math.random());
      colorAttr[i * 3] = mixed.r;
      colorAttr[i * 3 + 1] = mixed.g;
      colorAttr[i * 3 + 2] = mixed.b;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colorAttr, 3));

    const material = new THREE.PointsMaterial({
      size: 0.05,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    return new THREE.Points(geometry, material);
  }
}
