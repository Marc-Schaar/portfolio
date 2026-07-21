import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { HeroCanvasComponent } from './hero-canvas/hero-canvas.component';

@Component({
    selector: 'app-atf',
    imports: [TranslateModule, HeroCanvasComponent, NgOptimizedImage],
    templateUrl: './atf.component.html',
    styleUrls: ['./atf.component.scss', './atf.responsive.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AtfComponent {}
