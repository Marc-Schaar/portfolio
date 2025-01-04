import { Component } from '@angular/core';
import { GlobalService } from '../global.service';
import { TranslationService } from './../translation.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  constructor(
    private globalService: GlobalService,
    private translationService: TranslationService
  ) {}
  isOpen = false;

  scroll() {
    this.globalService.scrollToTop();
  }

  toggleMenu() {
    this.isOpen = !this.isOpen;

    if (this.isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }

  changeLanguage(lang: string): void {
    this.translationService.changeLanguage(lang); // Sprache ändern
    console.log(lang);
  }
}
