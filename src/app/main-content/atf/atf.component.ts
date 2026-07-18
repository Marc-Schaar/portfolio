import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { HeroCanvasComponent } from './hero-canvas/hero-canvas.component';

@Component({
    selector: 'app-atf',
    imports: [TranslateModule, HeroCanvasComponent],
    templateUrl: './atf.component.html',
    styleUrls: ['./atf.component.scss', './atf.responsive.component.scss']
})
export class AtfComponent {}
