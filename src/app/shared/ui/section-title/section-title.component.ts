import { ChangeDetectionStrategy, Component, HostBinding, input } from '@angular/core';

@Component({
  selector: 'app-section-title',
  imports: [],
  templateUrl: './section-title.component.html',
  styleUrls: ['./section-title.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SectionTitleComponent {
  readonly variant = input<'about-me' | 'portfolio' | 'contact' | 'skills'>(
    'skills'
  );
  readonly aosEffect = input<string>();
  readonly aosDelay = input<number>();
  readonly aosAnchor = input<string>();

  @HostBinding('class') get hostClass(): string {
    return this.variant();
  }
}
