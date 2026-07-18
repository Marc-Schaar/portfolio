import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GlobalService } from '../global.service';
import { TranslateModule } from '@ngx-translate/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { fromEvent, Subscription } from 'rxjs';

@Component({
    selector: 'app-header',
    imports: [TranslateModule, RouterLink, CommonModule],
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  constructor(private globalService: GlobalService) {}
  isOpen = false;
  currentLang = this.globalService.getCurrentLanguage();
  languages = ['de', 'en'];

  resizeSubscription!: Subscription;

  @ViewChild('menuToggle') menuToggle?: ElementRef<HTMLButtonElement>;
  @ViewChild('mobileNav') mobileNav?: ElementRef<HTMLElement>;

  ngOnInit(): void {
    this.handleResize(); // Initial check

    this.resizeSubscription = fromEvent(window, 'resize').subscribe(() =>
      this.handleResize()
    );
  }

  scroll() {
    this.globalService.scrollToTop();
  }

  toggleMenu() {
    this.isOpen = !this.isOpen;
    this.setBodyScroll();

    if (this.isOpen) {
      this.focusFirstNavLink();
    } else {
      this.menuToggle?.nativeElement.focus();
    }
  }

  closeMenu() {
    this.isOpen = false;
    this.setBodyScroll();
  }

  private setBodyScroll() {
    document.body.style.overflow = this.isOpen ? 'hidden' : '';
  }

  private focusFirstNavLink() {
    setTimeout(() => {
      const firstLink = this.mobileNav?.nativeElement.querySelector(
        'a'
      ) as HTMLElement | null;
      firstLink?.focus();
    });
  }

  changeLanguage(lang: string): void {
    this.globalService.changeLanguage(lang);
    this.currentLang = lang;
  }

  handleResize() {
    const width = window.innerWidth;
    if (width < 1000) {
      if (!this.isOpen) {
        this.isOpen = false;
        document.body.style.overflow = '';
      }
    } else {
      if (this.isOpen) {
        this.isOpen = false;
        document.body.style.overflow = '';
      }
    }
  }
}
