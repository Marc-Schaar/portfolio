import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-references',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './references.component.html',
  styleUrls: [
    './references.component.scss',
    './references.responsive.component.scss',
  ],
})
export class ReferencesComponent {
  references: any[] = [
    {
      name: 'marc',
      img: 'quelle',
      text: 'gut gemacht',
    },
    {
      name: 'jamal',
      img: 'quelle',
      text: 'toll gemacht',
    },
    {
      name: 'lara',
      img: 'quelle',
      text: 'super gemacht',
    },
  ];

  currentIndex: number = 2 % this.references.length;
  isChanging: boolean = false;

  back() {
    this.currentIndex =
      (this.currentIndex - 1 + this.references.length) % this.references.length;
  }

  next() {
    this.currentIndex = (this.currentIndex + 1) % this.references.length;
  }
}
