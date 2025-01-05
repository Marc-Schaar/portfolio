import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { GlobalService } from '../../shared/global.service';
import { TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslateModule],
  templateUrl: './contact.component.html',
  styleUrls: [
    './contact.component.scss',
    './contact.responsive.component.scss',
  ],
})
export class ContactComponent {
  constructor(private globalService: GlobalService) {}

  contactData: { name: string; email: string; message: string } = {
    name: '',
    email: '',
    message: '',
  };

  http = inject(HttpClient);
  #name: string = '';

  scroll() {
    this.globalService.scrollToTop();
  }

  mailTest = false;

  post = {
    endPoint: 'https://deineDomain.de/sendMail.php',
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
            this.contactData = {
              name: '',
              email: '',
              message: '',
            };
          },
          error: (error) => {
            console.error(error);
          },
          complete: () => console.info('send post complete'),
        });
    } else if (ngForm.submitted && ngForm.form.valid && this.mailTest) {
      console.log(this.contactData);

      ngForm.resetForm();
      this.contactData = {
        name: '',
        email: '',
        message: '',
      };
    }
  }
}
