import { Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'app-bg-decoration',
  standalone: true,
  imports: [],
  templateUrl: './bg-decoration.component.html',
})
export class BgDecorationComponent {
  @Input() src = '';
  @Input() filter: 'primary' | 'secundary' = 'primary';

  @HostBinding('attr.data-aos') aos = 'fade';
  @HostBinding('attr.data-aos-delay') aosDelay = '100';

  get filterClass(): string {
    return this.filter + '-filter-blur';
  }
}
