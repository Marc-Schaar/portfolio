import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss', './skills.responsive.component.scss'],
})
export class SkillsComponent {
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
