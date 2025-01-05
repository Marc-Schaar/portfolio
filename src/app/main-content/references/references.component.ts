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
    },
    {
      name: 'jamal',
      img: 'quelle',
    },
    {
      name: 'lara',
      img: 'quelle',
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
