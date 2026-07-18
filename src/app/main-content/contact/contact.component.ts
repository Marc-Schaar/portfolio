import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { GlobalService } from '../../shared/global.service';
import { TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { ButtonComponent } from '../../shared/ui/button/button.component';
import { InputComponent } from '../../shared/ui/input/input.component';
import { TextareaComponent } from '../../shared/ui/textarea/textarea.component';
import { BgDecorationComponent } from '../../shared/ui/bg-decoration/bg-decoration.component';
import { SectionTitleComponent } from '../../shared/ui/section-title/section-title.component';
import { FieldErrorComponent } from '../../shared/ui/field-error/field-error.component';

@Component({
    selector: 'app-contact',
    imports: [
        CommonModule,
        ReactiveFormsModule,
        TranslateModule,
        RouterLink,
        ButtonComponent,
        InputComponent,
        TextareaComponent,
        BgDecorationComponent,
        SectionTitleComponent,
        FieldErrorComponent,
    ],
    templateUrl: './contact.component.html',
    styleUrls: [
        './contact.component.scss',
        './contact.responsive.component.scss',
    ]
})
export class ContactComponent {
  globalService = inject(GlobalService);
  http = inject(HttpClient);
  private fb = inject(FormBuilder);

  mailTest: boolean = false;
  mailSendSucess: boolean = false;

  contactForm: FormGroup = this.fb.group({
    name: [
      '',
      [
        Validators.required,
        Validators.minLength(2),
        Validators.pattern('[a-zA-Z0-9äöüÄÖÜß ,.!?@-]+'),
      ],
    ],
    email: [
      '',
      [
        Validators.required,
        Validators.pattern('[a-zA-Z0-9._%+\\-]+@[a-zA-Z0-9.\\-]+\\.[a-zA-Z]{2,}'),
      ],
    ],
    message: ['', [Validators.required]],
    privacy: [false, [Validators.requiredTrue]],
  });

  get name() {
    return this.contactForm.get('name');
  }

  get email() {
    return this.contactForm.get('email');
  }

  get message() {
    return this.contactForm.get('message');
  }

  get privacy() {
    return this.contactForm.get('privacy');
  }

  scroll() {
    this.globalService.scrollToTop();
  }

  post = {
    endPoint: 'https://marc-schaar.com/sendMail.php',
    body: (payload: Record<string, unknown>) => JSON.stringify(payload),
    options: {
      headers: {
        'Content-Type': 'text/plain',
        responseType: 'text',
      },
    },
  };

  onSubmit() {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    const { name, email, message } = this.contactForm.value;
    const contactData = { name, email, message };

    if (this.mailTest) {
      this.contactForm.reset();
      this.showSuccesMsg();
      return;
    }

    this.http.post(this.post.endPoint, this.post.body(contactData)).subscribe({
      next: () => {
        this.contactForm.reset();
        this.showSuccesMsg();
      },
      error: (error) => {
        console.error(error);
      },
      complete: () => console.info('send post complete'),
    });
  }

  showSuccesMsg() {
    this.mailSendSucess = true;
    setTimeout(() => {
      this.mailSendSucess = false;
    }, 6000);
  }
}
