import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-atf',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './atf.component.html',
  styleUrls: ['./atf.component.scss', './atf.responsive.component.scss'],
})
export class AtfComponent {}
