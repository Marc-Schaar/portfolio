import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { GlobalService } from '../../shared/global.service';
import { TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslateModule, RouterLink],
  templateUrl: './contact.component.html',
  styleUrls: [
    './contact.component.scss',
    './contact.responsive.component.scss',
  ],
})
export class ContactComponent {
  constructor() {}
  globalService = inject(GlobalService);
  http = inject(HttpClient);
  mailTest: boolean = false;
  mailSendSucess: boolean = false;

  contactData: { name: string; email: string; message: string } = {
    name: '',
    email: '',
    message: '',
  };

  scroll() {
    this.globalService.scrollToTop();
  }

  post = {
    endPoint: 'https://marc-schaar.com/sendMail.php',
    body: (payload: any) => JSON.stringify(payload),
    options: {
      headers: {
        'Content-Type': 'text/plain',
        responseType: 'text',
      },
    },
  };

  onSubmit(ngForm: NgForm) {
    if (ngForm.submitted && ngForm.form.valid && !this.mailTest) {
      this.http
        .post(this.post.endPoint, this.post.body(this.contactData))
        .subscribe({
          next: (response) => {
            ngForm.resetForm();
            this.mailSendSucess = true;
            setTimeout(() => {
              this.mailSendSucess = false;
            }, 2000);
          },
          error: (error) => {
            console.error(error);
          },
          complete: () => console.info('send post complete'),
        });
    } else if (ngForm.submitted && ngForm.form.valid && this.mailTest) {
      ngForm.resetForm();
      this.showSuccesMsg();
    }
  }

  showSuccesMsg() {
    this.mailSendSucess = true;
    setTimeout(() => {
      this.mailSendSucess = false;
    }, 2000);
  }
}
