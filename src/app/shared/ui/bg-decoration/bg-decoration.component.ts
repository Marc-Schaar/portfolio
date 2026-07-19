import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  computed,
  input,
} from '@angular/core';

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
  templateUrl: './bg-decoration.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BgDecorationComponent {
  readonly src = input('');
  readonly filter = input<'primary' | 'secundary'>('primary');

  @HostBinding('attr.data-aos') aos = 'fade';
  @HostBinding('attr.data-aos-delay') aosDelay = '100';

  readonly filterClass = computed(() => `${this.filter()}-filter-blur`);

  readonly maskImage = computed(() => `url(${this.src()})`);

  private readonly intrinsicSize = computed(() => {
    const filename = this.src().split('/').pop() ?? '';
    return INTRINSIC_SIZE[filename] ?? { width: 1, height: 1 };
  });

  readonly intrinsicWidth = computed(() => this.intrinsicSize().width);

  readonly aspectRatio = computed(() => {
    const { width, height } = this.intrinsicSize();
    return `${width} / ${height}`;
  });
}
