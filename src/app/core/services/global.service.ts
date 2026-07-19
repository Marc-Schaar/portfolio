import { DOCUMENT, Injectable, Signal, effect, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class GlobalService {
  private readonly translate = inject(TranslateService);
  private readonly document = inject(DOCUMENT);

  private readonly setLanguage: string = 'setLanguage';

  readonly currentLang: Signal<string>;

  constructor() {
    const savedLang = localStorage.getItem(this.setLanguage);
    const browserLang = this.translate.getBrowserLang();
    const initialLang =
      savedLang || (browserLang?.match(/de/) ? browserLang : 'en');

    this.currentLang = toSignal(
      this.translate.onLangChange.pipe(map((event) => event.lang)),
      { initialValue: initialLang }
    );

    this.translate.use(initialLang);

    if (!savedLang) {
      localStorage.setItem(this.setLanguage, initialLang);
    }

    effect(() => {
      this.document.documentElement.lang = this.currentLang();
    });
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
}
