import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import AOS from 'aos';

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [TranslateModule, CommonModule],
  templateUrl: './portfolio.component.html',
  styleUrls: [
    './portfolio.component.scss',
    './portfolio.responsive.component.scss',
  ],
})
export class PortfolioComponent {
  public projects = [
    {
      title: 'Da Bubble',
      description: 'daBubbleDescription',
      image: 'da-bubble',
      skills: [
        'Angular',
        'Angular Material',
        'TypeScript',
        'JavaScript',
        'Firebase (Auth, Firestore)',
        'Sass',
        'CSS3',
      ],
    },
    {
      title: 'Join',
      description: 'joinDescription',
      image: 'join',
      skills: ['Firebase (Realtime Database)', 'JavaScript', 'CSS3', 'HTML5'],
    },
    {
      title: 'El-Pollo-Loco',
      description: 'elPolloLocoDescription',
      image: 'el-pollo-loco',
      skills: ['JavaScript', 'OOP-Patterns', 'CSS3', 'HTML5'],
    },
    {
      title: 'Pokedex',
      description: 'pokedexDescription',
      image: 'pokedex',
      skills: [
        'JavaScript',
        'REST API (PokéAPI)',
        'Bootstrap 5',
        'CSS3',
        'HTML5',
      ],
    },
  ];

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
          this.DEFAULT_OFFSET - this.DEFAULT_OFFSET
        ))
      : (this.aosAnchorOffset = this.DEFAULT_OFFSET);
  }
}
