import { Component, HostBinding, Input } from '@angular/core';

@Component({
    selector: 'app-section-title',
    imports: [],
    templateUrl: './section-title.component.html',
    styleUrls: ['./section-title.component.scss']
})
export class SectionTitleComponent {
  @Input() variant: 'about-me' | 'portfolio' | 'contact' | 'skills' =
    'skills';
  @Input() aosEffect?: string;
  @Input() aosDelay?: number;
  @Input() aosAnchor?: string;

  @HostBinding('class') get hostClass(): string {
    return this.variant;
  }
}
