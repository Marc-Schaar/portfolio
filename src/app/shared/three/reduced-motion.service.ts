import { Injectable } from '@angular/core';
import { Observable, fromEvent, map, startWith } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ReducedMotionService {
  private readonly mediaQuery = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  );

  readonly prefersReducedMotion = this.mediaQuery.matches;

  readonly prefersReducedMotion$: Observable<boolean> = fromEvent<MediaQueryListEvent>(
    this.mediaQuery,
    'change'
  ).pipe(
    map((event) => event.matches),
    startWith(this.mediaQuery.matches)
  );
}
