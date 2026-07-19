import { Component, inject } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { BgDecorationComponent } from '../../../shared/ui/bg-decoration/bg-decoration.component';
import { SectionTitleComponent } from '../../../shared/ui/section-title/section-title.component';
import { ReducedMotionService } from '../../../shared/three/reduced-motion.service';
import { shouldUseStaticBackgroundFallback } from '../../../shared/three/ambient-fallback';
import { SkillsParticlesComponent } from './skills-particles/skills-particles.component';

@Component({
  selector: 'app-skills',
  imports: [
    TranslateModule,
    BgDecorationComponent,
    SectionTitleComponent,
    SkillsParticlesComponent,
  ],
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss', './skills.responsive.component.scss'],
})
export class SkillsComponent {
  private readonly reducedMotion = inject(ReducedMotionService);
  readonly useStaticBackground = shouldUseStaticBackgroundFallback(
    this.reducedMotion.prefersReducedMotion,
  );

  frontEndSkills: { label: string; icon: string }[] = [
    { label: 'HTML', icon: 'html' },
    { label: 'CSS', icon: 'css' },
    { label: 'JavaScript', icon: 'javascript' },
    { label: 'TypeScript', icon: 'typescript' },
    { label: 'Angular', icon: 'angular' },
    { label: 'RxJs', icon: 'rxjs' },
    { label: 'Firebase', icon: 'firebase' },
    { label: 'Supabase', icon: 'supabase' },
    { label: 'Rest Api', icon: 'rest-api' },
    { label: 'Git', icon: 'git' },
    { label: 'Scrum', icon: 'scrum' },
    { label: 'Material Design', icon: 'material-design' },
    { label: 'Wordpress', icon: 'wordpress' },
  ];

  backEndSkills: { label: string; icon: string }[] = [
    { label: 'Python', icon: 'python' },
    { label: 'Django', icon: 'django' },
    { label: 'DRF', icon: 'drf' },
    { label: 'PostgreSQL', icon: 'postgresql' },
    { label: 'SQL', icon: 'sql' },
    { label: 'Redis', icon: 'redis' },
    { label: 'Docker', icon: 'docker' },
    { label: 'Linux', icon: 'linux' },
    { label: 'Shell Scripting', icon: 'shell-scripting' },
    { label: 'Cloud', icon: 'cloud' },
    { label: 'Heroku', icon: 'heroku' },
  ];
}
