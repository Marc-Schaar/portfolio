import { CommonModule } from '@angular/common';
import { Component, HostListener, inject } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import AOS from 'aos';
import { BgDecorationComponent } from '../../../shared/ui/bg-decoration/bg-decoration.component';
import { SectionTitleComponent } from '../../../shared/ui/section-title/section-title.component';
import { TiltDirective } from '../../../shared/ui/tilt/tilt.directive';
import { ReducedMotionService } from '../../../shared/three/reduced-motion.service';
import { shouldUseStaticBackgroundFallback } from '../../../shared/three/ambient-fallback';

export type ProjectCategory = 'frontend' | 'backend' | 'fullstack';
export type ProjectFilter = 'all' | ProjectCategory;

@Component({
  selector: 'app-portfolio',
  imports: [
    TranslateModule,
    CommonModule,
    BgDecorationComponent,
    SectionTitleComponent,
    TiltDirective,
  ],
  templateUrl: './portfolio.component.html',
  styleUrls: [
    './portfolio.component.scss',
    './portfolio.responsive.component.scss',
  ],
})
export class PortfolioComponent {
  private readonly reducedMotion = inject(ReducedMotionService);
  readonly useStaticBackground = shouldUseStaticBackgroundFallback(
    this.reducedMotion.prefersReducedMotion,
  );

  public projects: {
    title: string;
    description: string;
    image: string;
    liveUrl: string;
    githubUrl: string;
    category: ProjectCategory;
    skills: string[];
  }[] = [
    {
      title: 'DA Bubble',
      description: 'daBubbleDescription',
      image: 'da-bubble',
      liveUrl: 'https://da-bubble.marc-schaar.com',
      githubUrl: 'https://github.com/Marc-Schaar/da-bubble',
      category: 'frontend',
      skills: [
        'Angular',
        'Angular Material',
        'TypeScript',
        'Firebase (Auth, Firestore)',
        'Sass',
        'CSS3',
      ],
    },
    {
      title: 'Join',
      description: 'joinDescription',
      image: 'join',
      liveUrl: 'https://join.marc-schaar.com',
      githubUrl: 'https://github.com/Marc-Schaar/join',
      category: 'frontend',
      skills: ['Firebase (Realtime Database)', 'JavaScript', 'CSS3', 'HTML5'],
    },
    {
      title: 'El-Pollo-Loco',
      description: 'elPolloLocoDescription',
      image: 'el-pollo-loco',
      liveUrl: 'https://el-pollo-loco.marc-schaar.com',
      githubUrl: 'https://github.com/Marc-Schaar/el-pollo-loco',
      category: 'frontend',
      skills: ['JavaScript', 'OOP-Patterns', 'CSS3', 'HTML5'],
    },
    {
      title: 'Coderr',
      description: 'coderrDescription',
      image: 'coderr',
      liveUrl: 'https://coderr.marc-schaar.com',
      githubUrl: 'https://github.com/Marc-Schaar/coderr_backend',
      category: 'backend',
      skills: [
        'Python',
        'Django',
        'Django REST Framework',
        'PostgreSQL',
        'Docker',
        'GitHub Actions',
      ],
    },
    {
      title: 'KanMind',
      description: 'kanMindDescription',
      image: 'kanmind',
      liveUrl: 'https://kanmind.marc-schaar.com',
      githubUrl: 'https://github.com/Marc-Schaar/kan_mind_backend',
      category: 'backend',
      skills: [
        'Python',
        'Django',
        'Django REST Framework',
        'PostgreSQL',
        'Gunicorn',
        'Nginx',
      ],
    },
  ];

  public filters: ProjectFilter[] = [
    'all',
    ...(Array.from(
      new Set(this.projects.map((p) => p.category)),
    ) as ProjectCategory[]),
  ];
  public activeFilter: ProjectFilter = 'all';

  get filteredProjects() {
    return this.activeFilter === 'all'
      ? this.projects
      : this.projects.filter((p) => p.category === this.activeFilter);
  }

  setFilter(filter: ProjectFilter) {
    if (this.activeFilter === filter) return;
    this.activeFilter = filter;
    setTimeout(() => AOS.refresh());
  }

  public aosEffects = ['fade-left', 'fade-right'];
  public baseDelay = 300;
  public aosDuration = 400;
  public aosAnchorOffset = 600;
  private readonly DEFAULT_OFFSET = 600;

  @HostListener('window:resize', ['$event'])
  onResize(event: UIEvent) {
    const w = (event.target as Window).innerWidth;
    this.updateAnchorOffset(w);
    AOS.refresh();
  }

  private updateAnchorOffset(width: number) {
    width < 1000
      ? (this.aosAnchorOffset = Math.round(
          this.DEFAULT_OFFSET - this.DEFAULT_OFFSET,
        ))
      : (this.aosAnchorOffset = this.DEFAULT_OFFSET);
  }
}
