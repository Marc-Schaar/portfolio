import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class GlobalService {
  private setLanguage: string = 'setLanguage';

  constructor(private translate: TranslateService) {
    let savedLang = localStorage.getItem(this.setLanguage);
    let browserLang = this.translate.getBrowserLang();
    let initialLang =
      savedLang || (browserLang?.match(/de/) ? browserLang : 'en');

    this.translate.use(initialLang);

    if (!savedLang) {
      localStorage.setItem(this.setLanguage, initialLang);
    }
  }

  scrollToTop(): void {
    window.scrollTo({
      top: 0,
    });
  }

  changeLanguage(lang: string): void {
    this.translate.use(lang);
    localStorage.setItem(this.setLanguage, lang);
  }

  getCurrentLanguage(): string {
    return this.translate.currentLang;
  }
}
