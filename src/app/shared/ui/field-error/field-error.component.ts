import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { AbstractControl } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { EMPTY, switchMap } from 'rxjs';

@Component({
  selector: 'app-field-error',
  imports: [TranslateModule],
  templateUrl: './field-error.component.html',
  styleUrls: ['./field-error.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FieldErrorComponent {
  readonly errorId = input('');
  readonly control = input<AbstractControl | null>(null);
  readonly messages = input<{ [errorKey: string]: string[] }>({});

  // AbstractControl mutates its dirty/touched/invalid state in place rather
  // than emitting a new reference, so `control` changing alone can't drive
  // reactivity here -- `control.events` is what actually re-fires on
  // markAsTouched/markAsDirty/statusChanges/valueChanges.
  private readonly controlEvents = toSignal(
    toObservable(this.control).pipe(
      switchMap((control) => control?.events ?? EMPTY)
    ),
    { initialValue: null }
  );

  readonly visible = computed(() => {
    this.controlEvents();
    const control = this.control();
    return (
      !!control &&
      control.invalid === true &&
      (control.dirty || control.touched) === true
    );
  });

  readonly activeMessages = computed(() => {
    this.controlEvents();
    const errors = this.control()?.errors;
    if (!errors) {
      return [];
    }
    const messages = this.messages();
    return Object.keys(errors)
      .filter((key: string) => messages[key])
      .reduce<string[]>((acc, key: string) => acc.concat(messages[key]), []);
  });
}
