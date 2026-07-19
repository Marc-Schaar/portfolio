import { Inject, Injectable, DOCUMENT } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class GlobalService {
  private setLanguage: string = 'setLanguage';

  constructor(
    private translate: TranslateService,
    @Inject(DOCUMENT) private document: Document
  ) {
    const savedLang = localStorage.getItem(this.setLanguage);
    const browserLang = this.translate.getBrowserLang();
    const initialLang =
      savedLang || (browserLang?.match(/de/) ? browserLang : 'en');

    this.translate.use(initialLang);
    this.document.documentElement.lang = initialLang;

    this.translate.onLangChange.subscribe((event) => {
      this.document.documentElement.lang = event.lang;
    });

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
