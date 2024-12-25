import { Component, AfterViewInit } from '@angular/core';
import { AtfComponent } from './atf/atf.component';
import { AboutMeComponent } from './about-me/about-me.component';
import { SkillsComponent } from './skills/skills.component';

@Component({
  selector: 'app-main-content',
  standalone: true,
  imports: [AtfComponent, AboutMeComponent, SkillsComponent],
  templateUrl: './main-content.component.html',
  styleUrl: './main-content.component.scss',
})
export class MainContentComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    const elements = document.querySelectorAll('.scroll-animation');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          this.toogleVisabilty(entry);
        });
      },
      {
        threshold: 0.001,
      }
    );
    elements.forEach((el) => observer.observe(el));
  }

  toogleVisabilty(entry: any) {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    } else {
      entry.target.classList.remove('visible');
    }
  }
}
