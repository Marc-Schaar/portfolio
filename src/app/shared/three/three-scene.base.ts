import {
  AfterViewInit,
  Directive,
  ElementRef,
  NgZone,
  OnDestroy,
  ViewChild,
  inject,
} from '@angular/core';
import * as THREE from 'three';
import { Subscription } from 'rxjs';
import { ReducedMotionService } from './reduced-motion.service';
import { ScrollProgressService } from './scroll-progress.service';
import { isWebglAvailable } from './webgl-support';
import { getDeviceTier } from './device-tier';

/**
 * Shared lifecycle for a decorative three.js canvas: scene/camera/renderer
 * setup, resize handling, a render loop that never touches Angular change
 * detection, and pausing when off-screen or the tab is hidden. Subclasses
 * only describe what to build and how it evolves per frame.
 *
 * When reduced-motion is on or WebGL is unavailable, no scene is created at
 * all -- the host's existing static background stays visible underneath.
 */
@Directive()
export abstract class ThreeSceneComponent implements AfterViewInit, OnDestroy {
  @ViewChild('canvas', { static: true })
  private canvasRef!: ElementRef<HTMLCanvasElement>;

  protected readonly ngZone = inject(NgZone);
  protected readonly reducedMotion = inject(ReducedMotionService);
  protected readonly scrollProgress = inject(ScrollProgressService);

  protected scene!: THREE.Scene;
  protected camera!: THREE.PerspectiveCamera;
  protected renderer!: THREE.WebGLRenderer;

  /** Tightened by subclasses (e.g. an always-on background) if needed. */
  protected maxPixelRatio = 2;

  private resizeObserver?: ResizeObserver;
  private ratioSubscription?: Subscription;
  private readonly clock = new THREE.Clock();
  private running = false;
  private inViewport = true;

  ngAfterViewInit(): void {
    if (this.reducedMotion.prefersReducedMotion || !isWebglAvailable()) {
      return;
    }
    this.init();
  }

  ngOnDestroy(): void {
    this.resizeObserver?.disconnect();
    document.removeEventListener('visibilitychange', this.onVisibilityChange);
    this.ratioSubscription?.unsubscribe();

    if (this.renderer) {
      this.renderer.setAnimationLoop(null);
      this.renderer.dispose();
    }
    this.scene?.traverse((object) => this.disposeObject(object));
  }

  protected abstract setupScene(
    scene: THREE.Scene,
    camera: THREE.PerspectiveCamera,
  ): void;
  protected abstract onFrame(
    elapsedSeconds: number,
    deltaSeconds: number,
  ): void;
  protected onResize(_width: number, _height: number): void {}
  protected onSectionRatio(_ratio: number): void {}

  private init(): void {
    const canvas = this.canvasRef.nativeElement;
    const host = canvas.parentElement ?? canvas;

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);

    this.renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: getDeviceTier() !== 'low',
    });
    this.renderer.setPixelRatio(
      Math.min(window.devicePixelRatio, this.maxPixelRatio),
    );

    this.setupScene(this.scene, this.camera);

    this.resizeObserver = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect;
      this.resize(width, height);
    });
    this.resizeObserver.observe(host);
    const initialRect = host.getBoundingClientRect();
    this.resize(initialRect.width, initialRect.height);

    document.addEventListener('visibilitychange', this.onVisibilityChange);

    this.ratioSubscription = this.scrollProgress
      .observeRatio(host)
      .subscribe((ratio) => {
        this.inViewport = ratio > 0;
        this.onSectionRatio(ratio);
        this.syncRunning();
      });

    this.ngZone.runOutsideAngular(() => {
      this.clock.start();
      this.renderer.setAnimationLoop(() => this.tick());
    });
    this.running = true;
  }

  private readonly onVisibilityChange = (): void => {
    this.syncRunning();
  };

  private syncRunning(): void {
    if (!this.renderer) return;
    const shouldRun = this.inViewport && !document.hidden;
    if (shouldRun && !this.running) {
      this.clock.start();
      this.renderer.setAnimationLoop(() => this.tick());
      this.running = true;
    } else if (!shouldRun && this.running) {
      this.renderer.setAnimationLoop(null);
      this.running = false;
    }
  }

  private resize(width: number, height: number): void {
    if (!width || !height || !this.renderer) return;
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height, false);
    this.onResize(width, height);
  }

  private tick(): void {
    const delta = this.clock.getDelta();
    this.onFrame(this.clock.elapsedTime, delta);
    this.renderer.render(this.scene, this.camera);
  }

  private disposeObject(object: THREE.Object3D): void {
    const mesh = object as Partial<THREE.Mesh>;
    mesh.geometry?.dispose();
    const material = mesh.material;
    if (Array.isArray(material)) {
      material.forEach((m) => m.dispose());
    } else {
      material?.dispose();
    }
  }
}
