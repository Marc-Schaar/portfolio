import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnInit,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { GlobalService } from '../../core/services/global.service';
import { TranslateModule } from '@ngx-translate/core';
import { RouterLink } from '@angular/router';
import { fromEvent } from 'rxjs';

@Component({
  selector: 'app-header',
  imports: [TranslateModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {
  private readonly globalService = inject(GlobalService);

  readonly isOpen = signal(false);
  readonly currentLang = this.globalService.currentLang;
  readonly languages = ['de', 'en'];

  readonly menuToggle = viewChild<ElementRef<HTMLButtonElement>>('menuToggle');
  readonly mobileNav = viewChild<ElementRef<HTMLElement>>('mobileNav');

  constructor() {
    fromEvent(window, 'resize')
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.handleResize());
  }

  ngOnInit(): void {
    this.handleResize(); // Initial check
  }

  scroll() {
    this.globalService.scrollToTop();
  }

  toggleMenu() {
    this.isOpen.set(!this.isOpen());
    this.setBodyScroll();

    if (this.isOpen()) {
      this.focusFirstNavLink();
    } else {
      this.menuToggle()?.nativeElement.focus();
    }
  }

  closeMenu() {
    this.isOpen.set(false);
    this.setBodyScroll();
  }

  private setBodyScroll() {
    document.body.style.overflow = this.isOpen() ? 'hidden' : '';
  }

  private focusFirstNavLink() {
    setTimeout(() => {
      const firstLink = this.mobileNav()?.nativeElement.querySelector(
        'a'
      ) as HTMLElement | null;
      firstLink?.focus();
    });
  }

  changeLanguage(lang: string): void {
    this.globalService.changeLanguage(lang);
  }

  handleResize() {
    const width = window.innerWidth;
    if (width < 1000) {
      if (!this.isOpen()) {
        this.isOpen.set(false);
        document.body.style.overflow = '';
      }
    } else {
      if (this.isOpen()) {
        this.isOpen.set(false);
        document.body.style.overflow = '';
      }
    }
  }
}
