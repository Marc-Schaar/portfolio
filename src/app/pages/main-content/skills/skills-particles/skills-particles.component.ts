import { ChangeDetectionStrategy, Component } from '@angular/core';
import * as THREE from 'three';
import { ThreeSceneComponent } from '../../../../shared/three/three-scene.base';

const CYAN = 0x00bee8;
const INDIGO = 0x4b47ff;
const PARTICLES_PER_CLUSTER = 60;

interface Cluster {
  points: THREE.Points;
  scattered: Float32Array;
  formed: Float32Array;
  live: Float32Array;
}

/**
 * Purely decorative particle layer behind the skill chips: two loose
 * clusters (frontend/backend) that assemble from a scattered state into a
 * cluster shape as the section scrolls into view, then idle-drift. The
 * chips themselves stay plain, accessible DOM -- this never replaces them.
 */
@Component({
  selector: 'app-skills-particles',
  imports: [],
  templateUrl: './skills-particles.component.html',
  styleUrl: './skills-particles.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkillsParticlesComponent extends ThreeSceneComponent {
  protected override maxPixelRatio = 1.5;

  private clusters: Cluster[] = [];
  private formProgress = 0;
  private formProgressTarget = 0;

  protected override setupScene(
    scene: THREE.Scene,
    camera: THREE.PerspectiveCamera
  ): void {
    camera.position.set(0, 0, 9);
    scene.add(new THREE.AmbientLight(0x334455, 1.4));

    this.clusters = [
      this.createCluster(CYAN, new THREE.Vector3(-2.6, 1, -1)),
      this.createCluster(INDIGO, new THREE.Vector3(2.6, -1, -1.5)),
    ];
    this.clusters.forEach((cluster) => scene.add(cluster.points));
  }

  protected override onSectionRatio(ratio: number): void {
    this.formProgressTarget = ratio;
  }

  protected override onFrame(elapsedSeconds: number, deltaSeconds: number): void {
    const smoothing = 1 - Math.pow(0.02, deltaSeconds);
    this.formProgress += (this.formProgressTarget - this.formProgress) * smoothing;

    this.clusters.forEach((cluster, clusterIndex) => {
      for (let i = 0; i < PARTICLES_PER_CLUSTER; i++) {
        const idx = i * 3;
        const jitter =
          Math.sin(elapsedSeconds * 0.6 + i + clusterIndex * 10) * 0.05 * this.formProgress;
        cluster.live[idx] =
          THREE.MathUtils.lerp(cluster.scattered[idx], cluster.formed[idx], this.formProgress) +
          jitter;
        cluster.live[idx + 1] =
          THREE.MathUtils.lerp(
            cluster.scattered[idx + 1],
            cluster.formed[idx + 1],
            this.formProgress
          ) + jitter;
        cluster.live[idx + 2] = THREE.MathUtils.lerp(
          cluster.scattered[idx + 2],
          cluster.formed[idx + 2],
          this.formProgress
        );
      }
      (cluster.points.geometry.attributes['position'] as THREE.BufferAttribute).needsUpdate =
        true;
      cluster.points.rotation.y = elapsedSeconds * 0.05 * (clusterIndex === 0 ? 1 : -1);
      (cluster.points.material as THREE.PointsMaterial).opacity =
        0.2 + this.formProgress * 0.55;
    });
  }

  private createCluster(color: number, center: THREE.Vector3): Cluster {
    const scattered = new Float32Array(PARTICLES_PER_CLUSTER * 3);
    const formed = new Float32Array(PARTICLES_PER_CLUSTER * 3);
    const live = new Float32Array(PARTICLES_PER_CLUSTER * 3);

    for (let i = 0; i < PARTICLES_PER_CLUSTER; i++) {
      const idx = i * 3;
      scattered[idx] = center.x + (Math.random() - 0.5) * 14;
      scattered[idx + 1] = center.y + (Math.random() - 0.5) * 12;
      scattered[idx + 2] = center.z + (Math.random() - 0.5) * 10 - 4;

      const radius = 1.1 + Math.random() * 0.9;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      formed[idx] = center.x + radius * Math.sin(phi) * Math.cos(theta);
      formed[idx + 1] = center.y + radius * Math.sin(phi) * Math.sin(theta);
      formed[idx + 2] = center.z + radius * Math.cos(phi) * 0.6;
    }
    live.set(scattered);

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(live, 3));
    const material = new THREE.PointsMaterial({
      size: 0.06,
      color,
      transparent: true,
      opacity: 0.2,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    return { points: new THREE.Points(geometry, material), scattered, formed, live };
  }
}
