import { Injectable } from '@angular/core';
import { Observable, fromEvent, map, shareReplay, startWith } from 'rxjs';

const FINE_THRESHOLDS = Array.from({ length: 21 }, (_, i) => i / 20);

@Injectable({ providedIn: 'root' })
export class ScrollProgressService {
  private readonly observerCache = new Map<string, IntersectionObserver>();
  private readonly callbacksByObserver = new Map<
    IntersectionObserver,
    Map<Element, (ratio: number) => void>
  >();

  /** Fine-grained intersection ratio (0..1) for one element, shared across callers per thresholds set. */
  observeRatio(
    el: Element,
    thresholds: number[] = FINE_THRESHOLDS
  ): Observable<number> {
    return new Observable<number>((subscriber) => {
      const observer = this.getObserver(thresholds);
      const callbacks = this.callbacksByObserver.get(observer)!;
      callbacks.set(el, (ratio) => subscriber.next(ratio));
      observer.observe(el);

      return () => {
        callbacks.delete(el);
        observer.unobserve(el);
      };
    });
  }

  /** Drop-in replacement for a plain "is this element on screen at all" IntersectionObserver. */
  observeVisible(el: Element): Observable<boolean> {
    return this.observeRatio(el, [0, 0.001]).pipe(map((ratio) => ratio > 0));
  }

  /** Normalized whole-document scroll position, one shared passive listener. */
  readonly documentScrollProgress$: Observable<number> = fromEvent(
    window,
    'scroll',
    { passive: true }
  ).pipe(
    startWith(null),
    map(() => this.computeScrollProgress()),
    shareReplay({ bufferSize: 1, refCount: true })
  );

  private getObserver(thresholds: number[]): IntersectionObserver {
    const key = thresholds.join(',');
    let observer = this.observerCache.get(key);
    if (!observer) {
      const callbacks = new Map<Element, (ratio: number) => void>();
      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            callbacks.get(entry.target)?.(entry.intersectionRatio);
          }
        },
        { threshold: thresholds }
      );
      this.observerCache.set(key, observer);
      this.callbacksByObserver.set(observer, callbacks);
    }
    return observer;
  }

  private computeScrollProgress(): number {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    if (scrollable <= 0) return 0;
    return Math.min(1, Math.max(0, window.scrollY / scrollable));
  }
}
