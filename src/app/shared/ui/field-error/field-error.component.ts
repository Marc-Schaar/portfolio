import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { NgModel } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-field-error',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './field-error.component.html',
  styleUrls: ['./field-error.component.scss'],
})
export class FieldErrorComponent {
  @Input() control!: NgModel;
  @Input() messages: { [errorKey: string]: string[] } = {};

  get visible(): boolean {
    return (
      !!this.control &&
      this.control.invalid === true &&
      (this.control.dirty || this.control.touched) === true
    );
  }

  get activeMessages(): string[] {
    const errors = this.control?.errors;
    if (!errors) {
      return [];
    }
    return Object.keys(errors)
      .filter((key: string) => this.messages[key])
      .reduce<string[]>((acc, key: string) => acc.concat(this.messages[key]), []);
  }
}
