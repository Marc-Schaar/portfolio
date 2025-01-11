import { Component, inject, OnInit } from '@angular/core';
import { GlobalService } from '../shared/global.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-legal-notice',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './legal-notice.component.html',
  styleUrl: './legal-notice.component.scss',
})
export class LegalNoticeComponent implements OnInit {
  constructor() {}

  globalService = inject(GlobalService);

  ngOnInit(): void {
    this.scroll();
  }

  scroll() {
    this.globalService.scrollToTop();
  }
}
