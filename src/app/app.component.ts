import { Component, inject } from '@angular/core';

import { RouterOutlet } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { AmbientBackgroundComponent } from './shared/ui/ambient-background/ambient-background.component';
import { ReducedMotionService } from './shared/three/reduced-motion.service';
import { shouldUseStaticBackgroundFallback } from './shared/three/ambient-fallback';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    TranslateModule,
    AmbientBackgroundComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Marc Schaar - Portfolio';

  private readonly reducedMotion = inject(ReducedMotionService);

  /**
   * Sections fall back to their static blur-image background on the same
   * condition (reduced motion, no WebGL, low-end/mobile device tier). The
   * global ambient canvas must honor the identical check -- otherwise both
   * layers render at once on phones, doubling up and muddying the tint.
   */
  readonly useAmbientBackground = !shouldUseStaticBackgroundFallback(
    this.reducedMotion.prefersReducedMotion
  );
}
