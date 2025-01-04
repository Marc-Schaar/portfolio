import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GlobalService {
  // private languageSubject = new BehaviorSubject<string>('en'); // Standardsprache 'en'

  constructor(private translate: TranslateService) {
    // Standardsprache setzen
    this.translate.setDefaultLang('en');

    // Automatisch die Sprache des Browsers verwenden oder Standard setzen
    let browserLang = this.translate.getBrowserLang();
    let initialLang = browserLang?.match(/en|de/) ? browserLang : 'en';
    this.translate.use(initialLang);
    // this.languageSubject.next(initialLang); // Sprache bekannt geben
  }

  scrollToTop(): void {
    window.scrollTo({
      top: 0,
    });
  }

  changeLanguage(lang: string): void {
    this.translate.use(lang); // Sprache ändern
    // this.languageSubject.next(lang); // Änderung bekannt geben
  }

  // getCurrentLanguage(): string {
  //   return this.translate.currentLang; // Aktuelle Sprache zurückgeben
  // }
}
