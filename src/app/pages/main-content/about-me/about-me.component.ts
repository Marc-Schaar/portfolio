
import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { BgDecorationComponent } from '../../../shared/ui/bg-decoration/bg-decoration.component';
import { SectionTitleComponent } from '../../../shared/ui/section-title/section-title.component';
import { ReducedMotionService } from '../../../shared/three/reduced-motion.service';
import { shouldUseStaticBackgroundFallback } from '../../../shared/three/ambient-fallback';

@Component({
    selector: 'app-about-me',
    imports: [
    TranslateModule,
    BgDecorationComponent,
    SectionTitleComponent,
    NgOptimizedImage
],
    templateUrl: './about-me.component.html',
    styleUrls: [
        './about-me.component.scss',
        './about-me.responsive.component.scss',
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AboutMeComponent {
  private readonly reducedMotion = inject(ReducedMotionService);
  readonly useStaticBackground = computed(() =>
    shouldUseStaticBackgroundFallback(this.reducedMotion.prefersReducedMotion())
  );

  subDescriptionRows: { icon: string; textKey: string; rowId?: string; anchor: string }[] = [
    {
      icon: 'assets/icons/lightbulb.svg',
      textKey: 'aboutMe.subDescription1',
      rowId: 'about-me-description2',
      anchor: '#about-me-description1',
    },
    {
      icon: 'assets/icons/location-pin.svg',
      textKey: 'aboutMe.subDescription2',
      rowId: 'about-me-description3',
      anchor: '#about-me-description2',
    },
    {
      icon: 'assets/icons/puzzle-piece.svg',
      textKey: 'aboutMe.subDescription3',
      anchor: '#about-me-description3',
    },
  ];
}
