import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { GlobalService } from '../../core/services/global.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'app-legal-notice',
    imports: [TranslateModule],
    templateUrl: './legal-notice.component.html',
    styleUrl: './legal-notice.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LegalNoticeComponent implements OnInit {
  globalService = inject(GlobalService);

  ngOnInit(): void {
    this.scroll();
  }

  scroll() {
    this.globalService.scrollToTop();
  }
}
