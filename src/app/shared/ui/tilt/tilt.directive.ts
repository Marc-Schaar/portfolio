import {
  Directive,
  ElementRef,
  NgZone,
  OnDestroy,
  OnInit,
  Renderer2,
  inject,
  input,
} from '@angular/core';
import { ReducedMotionService } from '../../three/reduced-motion.service';

const MAX_TILT_DEGREES = 10;
const NEUTRAL_TRANSFORM = 'perspective(800px) rotateX(0) rotateY(0) scale(1)';

/**
 * Lightweight CSS-only pointer-tilt effect (no WebGL) -- disabled for touch/coarse
 * pointers (no hover affordance there) and whenever reduced-motion is requested.
 */
@Directive({
  selector: '[appTilt]',
})
export class TiltDirective implements OnInit, OnDestroy {
  private readonly el = inject(ElementRef<HTMLElement>);
  private readonly renderer = inject(Renderer2);
  private readonly ngZone = inject(NgZone);
  private readonly reducedMotion = inject(ReducedMotionService);

  /**
   * Optional wider element (e.g. the whole project row) to listen for pointer
   * events on, so hovering the text next to the image already moves it too.
   */
  readonly tiltZone = input<HTMLElement>();

  private readonly cleanupFns: Array<() => void> = [];
  private rafId: number | null = null;

  ngOnInit(): void {
    const supportsHover = window.matchMedia('(hover: hover)').matches;
    const finePointer = window.matchMedia('(pointer: fine)').matches;
    if (
      this.reducedMotion.prefersReducedMotion() ||
      !supportsHover ||
      !finePointer
    ) {
      return;
    }

    const host = this.el.nativeElement;
    const zone = this.tiltZone() ?? host;
    this.renderer.setStyle(host, 'transition', 'transform 0.2s ease-out');
    this.renderer.setStyle(host, 'will-change', 'transform');

    this.ngZone.runOutsideAngular(() => {
      this.cleanupFns.push(
        this.renderer.listen(zone, 'pointermove', (event: PointerEvent) =>
          this.onPointerMove(event, zone)
        ),
        this.renderer.listen(zone, 'pointerleave', () => this.onPointerLeave())
      );
    });
  }

  ngOnDestroy(): void {
    if (this.rafId !== null) {
      cancelAnimationFrame(this.rafId);
    }
    this.cleanupFns.forEach((cleanup) => cleanup());
  }

  private onPointerMove(event: PointerEvent, zone: HTMLElement): void {
    if (this.rafId !== null) return;
    this.rafId = requestAnimationFrame(() => {
      this.rafId = null;
      const host = this.el.nativeElement;
      const rect = zone.getBoundingClientRect();
      const offsetX = (event.clientX - rect.left) / rect.width - 0.5;
      const offsetY = (event.clientY - rect.top) / rect.height - 0.5;
      const rotateY = offsetX * MAX_TILT_DEGREES * 2;
      const rotateX = -offsetY * MAX_TILT_DEGREES * 2;

      this.renderer.setStyle(
        host,
        'transform',
        `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`
      );
    });
  }

  private onPointerLeave(): void {
    if (this.rafId !== null) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
    this.renderer.setStyle(this.el.nativeElement, 'transform', NEUTRAL_TRANSFORM);
  }
}
