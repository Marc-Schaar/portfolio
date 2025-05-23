import { Component, inject, OnInit } from '@angular/core';
import { FooterComponent } from '../../shared/footer/footer.component';
import { UserService } from '../../services/user/shared.service';
import { IntroComponent } from '../intro/intro.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../shared/header/header.component';
import { SignInComponent } from '../sign-in/sign-in.component';

@Component({
  selector: 'app-main-component',
  imports: [CommonModule, HeaderComponent, FooterComponent, SignInComponent, IntroComponent, RouterModule],
  templateUrl: './main-component.component.html',
  styleUrl: './main-component.component.scss',
})
export class MainComponentComponent implements OnInit {
  shareddata = inject(UserService);
  showIntro: boolean = true;

  /**
   * Lifecycle hook that is called when the component is initialized.
   * checks if the intro should be shown based on local storage value.
   * Sets the dashboard and login properties of the shared service and hides the intro element after 4 seconds.
   */
  ngOnInit(): void {
    const showIntroStored = localStorage.getItem('showIntro');
    if (showIntroStored === 'false') {
      this.showIntro = false;
    } else {
      this.showIntro = true;
      setTimeout(() => {
        const projectName = document.getElementById('intro');
        if (projectName) {
          projectName.classList.add('d-none');
          this.turnOffIntro();
        }
      }, 4000);
    }
    this.shareddata.dashboard = false;
    this.shareddata.login = true;
  }

  /**
   * Disables the introductory view by setting a flag in local storage.
   *
   * Sets 'showIntro' to 'false' in localStorage to prevent the intro from showing again.
   */
  turnOffIntro() {
    localStorage.setItem('showIntro', 'false');
  }
}
