import { Component, inject, OnInit } from '@angular/core';
import { GlobalService } from '../shared/global.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-imprint',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './imprint.component.html',
  styleUrl: './imprint.component.scss',
})
export class ImprintComponent implements OnInit {
  constructor() {}

  globalService = inject(GlobalService);

  ngOnInit(): void {
    this.scroll();
  }

  scroll() {
    this.globalService.scrollToTop();
  }
}
