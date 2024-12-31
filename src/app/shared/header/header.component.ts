import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  isOpen = false;

  scrollToTop() {
    window.scrollTo({
      top: 0,
    });
  }

  toggleMenu() {
    console.log(this.isOpen);
    this.isOpen = !this.isOpen;
  }
}
