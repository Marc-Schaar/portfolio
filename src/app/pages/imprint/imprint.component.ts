import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { GlobalService } from '../../core/services/global.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'app-imprint',
    imports: [TranslateModule],
    templateUrl: './imprint.component.html',
    styleUrl: './imprint.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ImprintComponent implements OnInit {
  globalService = inject(GlobalService);

  ngOnInit(): void {
    this.scroll();
  }

  scroll() {
    this.globalService.scrollToTop();
  }
}
