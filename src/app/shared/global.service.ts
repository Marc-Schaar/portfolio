import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class GlobalService {
  constructor(private translate: TranslateService) {
    let browserLang = this.translate.getBrowserLang();
    let initialLang = browserLang?.match(/en|de/) ? browserLang : 'en';
    this.translate.use(initialLang);
  }

  scrollToTop() {
    window.scrollTo({
      top: 0,
    });
  }

  changeLanguage(lang: string) {
    this.translate.use(lang);
  }
}
