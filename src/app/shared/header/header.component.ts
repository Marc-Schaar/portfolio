import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../global.service';
import { TranslateModule } from '@ngx-translate/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { fromEvent, Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [TranslateModule, RouterLink, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  constructor(private globalService: GlobalService) {}
  isOpen = false;
  currentLang = this.globalService.getCurrentLanguage();

  resizeSubscription!: Subscription;

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

    if (this.isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
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
