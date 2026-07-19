
import { Component, inject } from '@angular/core';
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
    SectionTitleComponent
],
    templateUrl: './about-me.component.html',
    styleUrls: [
        './about-me.component.scss',
        './about-me.responsive.component.scss',
    ]
})
export class AboutMeComponent {
  private readonly reducedMotion = inject(ReducedMotionService);
  readonly useStaticBackground = shouldUseStaticBackgroundFallback(
    this.reducedMotion.prefersReducedMotion
  );

  subDescriptionRows: { icon: string; textKey: string; rowId?: string; anchor: string }[] = [
    {
      icon: 'assets/icons/Property 1=default (1).svg',
      textKey: 'aboutMe.subDescription1',
      rowId: 'about-me-description2',
      anchor: '#about-me-description1',
    },
    {
      icon: 'assets/icons/Property 1=Default.svg',
      textKey: 'aboutMe.subDescription2',
      rowId: 'about-me-description3',
      anchor: '#about-me-description2',
    },
    {
      icon: 'assets/icons/Property 1=Defauñt.svg',
      textKey: 'aboutMe.subDescription3',
      anchor: '#about-me-description3',
    },
  ];
}
