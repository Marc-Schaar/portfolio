import { ChangeDetectionStrategy, Component, AfterViewInit, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AtfComponent } from './atf/atf.component';
import { AboutMeComponent } from './about-me/about-me.component';
import { SkillsComponent } from './skills/skills.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { ReferencesComponent } from './references/references.component';
import { ContactComponent } from './contact/contact.component';
import { ReducedMotionService } from '../../shared/three/reduced-motion.service';
import { ScrollProgressService } from '../../shared/three/scroll-progress.service';
import * as AOS from 'aos';

@Component({
    selector: 'app-main-content',
    imports: [
        AtfComponent,
        AboutMeComponent,
        SkillsComponent,
        PortfolioComponent,
        ReferencesComponent,
        ContactComponent,
    ],
    templateUrl: './main-content.component.html',
    styleUrl: './main-content.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainContentComponent implements AfterViewInit {
  private readonly reducedMotion = inject(ReducedMotionService);
  private readonly scrollProgress = inject(ScrollProgressService);
  private readonly destroyRef = inject(DestroyRef);

  ngAfterViewInit(): void {
    const prefersReducedMotion = this.reducedMotion.prefersReducedMotion();

    AOS.init({
      easing: 'ease-in-out',
      once: prefersReducedMotion ? true : false,
      mirror: !prefersReducedMotion,
      offset: 120,
      disable: prefersReducedMotion,
    });

    document.querySelectorAll('.scroll-animation').forEach((el) => {
      this.scrollProgress
        .observeVisible(el)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe((visible) => {
          el.classList.toggle('visible', visible);
        });
    });
  }
}
