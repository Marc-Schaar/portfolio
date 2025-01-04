import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root', // Service global verfügbar machen
})
export class TranslationService {
  private languageSubject = new BehaviorSubject<string>('en'); // Standardsprache 'en'
  language$ = this.languageSubject.asObservable(); // Observable für Sprache

  constructor(private translate: TranslateService) {
    this.translate.setDefaultLang('en'); // Standardsprache setzen
    this.translate.use('en'); // Standardsprache aktivieren
  }

  // Sprache ändern
  changeLanguage(lang: string): void {
    this.translate.use(lang);
    this.languageSubject.next(lang); // Änderung bekannt geben
  }

  // Aktuelle Sprache abfragen
  getCurrentLanguage(): string {
    return this.translate.currentLang;
  }
}
