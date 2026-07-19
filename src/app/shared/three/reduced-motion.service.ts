import { Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Observable, fromEvent, map, startWith } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ReducedMotionService {
  private readonly mediaQuery = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  );

  readonly prefersReducedMotion$: Observable<boolean> = fromEvent<MediaQueryListEvent>(
    this.mediaQuery,
    'change'
  ).pipe(
    map((event) => event.matches),
    startWith(this.mediaQuery.matches)
  );

  readonly prefersReducedMotion = toSignal(this.prefersReducedMotion$, {
    initialValue: this.mediaQuery.matches,
  });
}
