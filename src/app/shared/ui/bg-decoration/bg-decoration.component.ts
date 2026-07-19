import { Component, HostBinding, Input } from '@angular/core';

// Intrinsic pixel size of each decoration SVG, used to reproduce the
// natural sizing/aspect-ratio an <img> would have had before the switch
// to a mask-colored <span>.
const INTRINSIC_SIZE: Record<string, { width: number; height: number }> = {
  'skills-shadow-green.svg': { width: 898, height: 976 },
  'about-me-shadow-purple.svg': { width: 740, height: 736 },
  'footer-shadow-purple.svg': { width: 1084, height: 940 },
  'portfolio-shadow-purple.svg': { width: 827, height: 934 },
};

@Component({
    selector: 'app-bg-decoration',
    imports: [],
    templateUrl: './bg-decoration.component.html'
})
export class BgDecorationComponent {
  @Input() src = '';
  @Input() filter: 'primary' | 'secundary' = 'primary';

  @HostBinding('attr.data-aos') aos = 'fade';
  @HostBinding('attr.data-aos-delay') aosDelay = '100';

  get filterClass(): string {
    return this.filter + '-filter-blur';
  }

  get maskImage(): string {
    return `url(${this.src})`;
  }

  private get intrinsicSize(): { width: number; height: number } {
    const filename = this.src.split('/').pop() ?? '';
    return INTRINSIC_SIZE[filename] ?? { width: 1, height: 1 };
  }

  get intrinsicWidth(): number {
    return this.intrinsicSize.width;
  }

  get aspectRatio(): string {
    const { width, height } = this.intrinsicSize;
    return `${width} / ${height}`;
  }
}
