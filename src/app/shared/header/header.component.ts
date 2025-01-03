import { Component } from '@angular/core';
import { GlobalService } from '../global.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  constructor(private globalService: GlobalService) {}
  isOpen = false;

  scroll() {
    this.globalService.scrollToTop();
  }

  toggleMenu() {
    console.log(this.isOpen);
    this.isOpen = !this.isOpen;
  }
}
