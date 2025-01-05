import { Component } from '@angular/core';
import { GlobalService } from '../global.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  constructor(private globalService: GlobalService) {}
  isOpen = false;
  currentLang = this.globalService.getCurrentLanguage();

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
    this.globalService.changeLanguage(lang);
    this.currentLang = lang;
  }
}
