
import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { BgDecorationComponent } from '../../../shared/ui/bg-decoration/bg-decoration.component';
import { ReducedMotionService } from '../../../shared/three/reduced-motion.service';
import { shouldUseStaticBackgroundFallback } from '../../../shared/three/ambient-fallback';

interface Reference {
  name: string;
  img: string;
}

@Component({
  selector: 'app-references',
  imports: [TranslateModule, BgDecorationComponent],
  templateUrl: './references.component.html',
  styleUrls: [
    './references.component.scss',
    './references.responsive.component.scss',
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReferencesComponent {
  private readonly reducedMotion = inject(ReducedMotionService);
  readonly useStaticBackground = computed(() =>
    shouldUseStaticBackgroundFallback(this.reducedMotion.prefersReducedMotion())
  );

  references: Reference[] = [
    {
      name: 'Antoine',
      img: 'quelle',
    },
    {
      name: 'Hiroshi',
      img: 'quelle',
    },
    {
      name: 'Dimitri',
      img: 'quelle',
    },
    {
      name: 'Romina',
      img: 'quelle',
    },
  ];

  readonly currentIndex = signal(Math.floor(Math.random() * this.references.length));

  back() {
    this.currentIndex.update(
      (i) => (i - 1 + this.references.length) % this.references.length
    );
  }

  next() {
    this.currentIndex.update((i) => (i + 1) % this.references.length);
  }

  goTo(i: number) {
    this.currentIndex.set(i);
  }
}
