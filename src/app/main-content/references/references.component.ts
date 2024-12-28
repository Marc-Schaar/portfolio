import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-references',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './references.component.html',
  styleUrl: './references.component.scss',
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
    {
      name: '1',
      img: 'quelle',
      text: 'prima gemacht',
    },
    {
      name: '2',
      img: 'quelle',
      text: 'klasse gemacht',
    },
    {
      name: '3',
      img: 'quelle',
      text: 'seh gut gemacht',
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
