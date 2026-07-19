import { Component } from '@angular/core';

import { RouterOutlet } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { AmbientBackgroundComponent } from './shared/ui/ambient-background/ambient-background.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    TranslateModule,
    AmbientBackgroundComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Marc Schaar - Portfolio';
}
