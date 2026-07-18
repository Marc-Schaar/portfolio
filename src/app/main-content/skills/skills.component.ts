
import { Component, inject } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { BgDecorationComponent } from '../../shared/ui/bg-decoration/bg-decoration.component';
import { SectionTitleComponent } from '../../shared/ui/section-title/section-title.component';
import { ReducedMotionService } from '../../shared/three/reduced-motion.service';
import { shouldUseStaticBackgroundFallback } from '../../shared/three/ambient-fallback';
import { SkillsParticlesComponent } from './skills-particles/skills-particles.component';

@Component({
    selector: 'app-skills',
    imports: [
    TranslateModule,
    BgDecorationComponent,
    SectionTitleComponent,
    SkillsParticlesComponent
],
    templateUrl: './skills.component.html',
    styleUrls: ['./skills.component.scss', './skills.responsive.component.scss']
})
export class SkillsComponent {
  private readonly reducedMotion = inject(ReducedMotionService);
  readonly useStaticBackground = shouldUseStaticBackgroundFallback(
    this.reducedMotion.prefersReducedMotion
  );

  frontEndSkills: string[] = [
    'HTML',
    'CSS',
    'JavaScript',
    'TypeScript',
    'Angular',
    'RxJs',
    'React',
    'Vue',
    'Firebase',
    'Supabase',
    'Rest Api',
    'Git',
    'Scrum',
    'Material Design',
    'Wordpress',
  ];

  backEndSkills: string[] = [
    'Python',
    'Django',
    'DRF',
    'Flask',
    'PostgreSQL',
    'SQL',
    'Redis',
    'Docker',
    'Linux',
    'Shell Scripting',
    'Cloud',
    'Heroku',
  ];
}
