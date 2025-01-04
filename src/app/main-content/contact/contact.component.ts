import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { GlobalService } from '../../shared/global.service';
import { TranslateModule } from '@ngx-translate/core';

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

  form: { name: string; email: string; message: string } = {
    name: '',
    email: '',
    message: '',
  };

  #name: string = '';

  onSubmit(ngForm: NgForm) {
    if (ngForm.valid && ngForm.submitted) {
      console.log('Form submitted:', this.form);
      ngForm.resetForm();
      this.form = {
        name: '',
        email: '',
        message: '',
      };
    }
  }

  scroll() {
    this.globalService.scrollToTop();
  }
}
