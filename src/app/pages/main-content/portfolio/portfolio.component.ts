import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  computed,
  inject,
  signal,
} from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import AOS from 'aos';
import { BgDecorationComponent } from '../../../shared/ui/bg-decoration/bg-decoration.component';
import { SectionTitleComponent } from '../../../shared/ui/section-title/section-title.component';
import { TiltDirective } from '../../../shared/ui/tilt/tilt.directive';
import { ReducedMotionService } from '../../../shared/three/reduced-motion.service';
import { shouldUseStaticBackgroundFallback } from '../../../shared/three/ambient-fallback';
import daBubblePng from '../../../../assets/img/projects/da-bubble.png';
import daBubbleWebp from '../../../../assets/img/projects/da-bubble.webp';
import joinPng from '../../../../assets/img/projects/join.png';
import joinWebp from '../../../../assets/img/projects/join.webp';
import elPolloLocoPng from '../../../../assets/img/projects/el-pollo-loco.png';
import elPolloLocoWebp from '../../../../assets/img/projects/el-pollo-loco.webp';
import videoflixPng from '../../../../assets/img/projects/videoflix.png';
import videoflixWebp from '../../../../assets/img/projects/videoflix.webp';
import coderrPng from '../../../../assets/img/projects/coderr.png';
import coderrWebp from '../../../../assets/img/projects/coderr.webp';
import kanmindPng from '../../../../assets/img/projects/kanmind.png';
import kanmindWebp from '../../../../assets/img/projects/kanmind.webp';

export type ProjectCategory = 'frontend' | 'backend' | 'fullstack';
export type ProjectFilter = 'all' | ProjectCategory;

@Component({
  selector: 'app-portfolio',
  imports: [
    TranslateModule,
    BgDecorationComponent,
    SectionTitleComponent,
    TiltDirective,
    NgOptimizedImage,
  ],
  templateUrl: './portfolio.component.html',
  styleUrls: [
    './portfolio.component.scss',
    './portfolio.responsive.component.scss',
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PortfolioComponent {
  private readonly reducedMotion = inject(ReducedMotionService);
  readonly useStaticBackground = computed(() =>
    shouldUseStaticBackgroundFallback(
      this.reducedMotion.prefersReducedMotion(),
    ),
  );

  public projects: {
    title: string;
    description: string;
    imagePng: string;
    imageWebp: string;
    liveUrl: string;
    githubUrl: string;
    category: ProjectCategory;
    skills: string[];
  }[] = [
    {
      title: 'DA Bubble',
      description: 'daBubbleDescription',
      imagePng: daBubblePng,
      imageWebp: daBubbleWebp,
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
      imagePng: joinPng,
      imageWebp: joinWebp,
      liveUrl: 'https://join.marc-schaar.com',
      githubUrl: 'https://github.com/Marc-Schaar/join',
      category: 'frontend',
      skills: ['Firebase (Realtime Database)', 'JavaScript', 'CSS3', 'HTML5'],
    },
    {
      title: 'El-Pollo-Loco',
      description: 'elPolloLocoDescription',
      imagePng: elPolloLocoPng,
      imageWebp: elPolloLocoWebp,
      liveUrl: 'https://el-pollo-loco.marc-schaar.com',
      githubUrl: 'https://github.com/Marc-Schaar/el-pollo-loco',
      category: 'frontend',
      skills: ['JavaScript', 'OOP-Patterns', 'CSS3', 'HTML5'],
    },
    {
      title: 'Videoflix',
      description: 'videoflixDescription',
      imagePng: videoflixPng,
      imageWebp: videoflixWebp,
      liveUrl: 'https://videoflix.marc-schaar.com',
      githubUrl: 'https://github.com/Marc-Schaar/videoflix_backend',
      category: 'backend',
      skills: [
        'Python',
        'Django',
        'Django REST Framework',
        'PostgreSQL',
        'Redis',
        'ffmpeg',
        'Docker',
        'GitHub Actions',
      ],
    },
    {
      title: 'Coderr',
      description: 'coderrDescription',
      imagePng: coderrPng,
      imageWebp: coderrWebp,
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
      imagePng: kanmindPng,
      imageWebp: kanmindWebp,
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
  readonly activeFilter = signal<ProjectFilter>('all');

  readonly filteredProjects = computed(() => {
    const filter = this.activeFilter();
    return filter === 'all'
      ? this.projects
      : this.projects.filter((p) => p.category === filter);
  });

  setFilter(filter: ProjectFilter) {
    if (this.activeFilter() === filter) return;
    this.activeFilter.set(filter);
    setTimeout(() => AOS.refresh());
  }

  public aosEffects = ['fade-left', 'fade-right'];
  public baseDelay = 300;
  public aosDuration = 400;
  private readonly DEFAULT_OFFSET = 600;
  readonly aosAnchorOffset = signal(this.DEFAULT_OFFSET);

  @HostListener('window:resize', ['$event'])
  onResize(event: UIEvent) {
    const w = (event.target as Window).innerWidth;
    this.updateAnchorOffset(w);
    AOS.refresh();
  }

  private updateAnchorOffset(width: number) {
    this.aosAnchorOffset.set(
      width < 1000
        ? Math.round(this.DEFAULT_OFFSET - this.DEFAULT_OFFSET)
        : this.DEFAULT_OFFSET,
    );
  }
}
