import { Routes } from '@angular/router';
import { MainContentComponent } from './pages/main-content/main-content.component';
import { ImprintComponent } from './pages/imprint/imprint.component';
import { LegalNoticeComponent } from './pages/legal-notice/legal-notice.component';

export const routes: Routes = [
  { path: '', component: MainContentComponent },
  { path: 'legal-notice', component: LegalNoticeComponent },
  { path: 'imprint', component: ImprintComponent },
];
