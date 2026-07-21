import { Routes } from '@angular/router';
import { MainContentComponent } from './pages/main-content/main-content.component';

export const routes: Routes = [
  { path: '', component: MainContentComponent },
  {
    path: 'legal-notice',
    loadComponent: () =>
      import('./pages/legal-notice/legal-notice.component').then(
        (m) => m.LegalNoticeComponent
      ),
  },
  {
    path: 'imprint',
    loadComponent: () =>
      import('./pages/imprint/imprint.component').then(
        (m) => m.ImprintComponent
      ),
  },
];
