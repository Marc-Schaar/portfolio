import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-about-me',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './about-me.component.html',
  styleUrls: [
    './about-me.component.scss',
    './about-me.responsive.component.scss',
  ],
})
export class AboutMeComponent {
  // constructor(private translate: TranslateService) {
  //   // Unterstützte Sprachen definieren
  //   this.translate.addLangs(['en', 'de']);
  //   this.translate.setDefaultLang('en'); // Standardsprache setzen
  //   // Automatisch die Sprache des Browsers verwenden
  //   const browserLang = this.translate.getBrowserLang();
  //   this.translate.use(browserLang?.match(/en|de/) ? browserLang : 'en');
  // }
  // changeLanguage(lang: string) {
  //   this.translate.use(lang); // Sprache ändern
  // }
}
