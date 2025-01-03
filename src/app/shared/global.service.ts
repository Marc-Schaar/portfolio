import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GlobalService {
  constructor() {}

  scrollToTop() {
    window.scrollTo({
      top: 0,
    });
  }

  // globalFunction(): string {
  //   return 'Ich bin eine globale Funktion!';
  // }
}
