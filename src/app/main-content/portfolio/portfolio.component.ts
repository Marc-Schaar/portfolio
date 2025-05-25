import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

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
}
