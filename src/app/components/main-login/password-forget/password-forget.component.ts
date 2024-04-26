import { Component, inject } from '@angular/core';
import { FooterComponent } from '../../../shared/components/login/footer/footer.component';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SmallBtnComponent } from '../../../shared/components/small-btn/small-btn.component';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { Firestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { StartHeaderComponent } from '../../../shared/components/login/start-header/start-header.component';

@Component({
  selector: 'app-password-forget',
  standalone: true,
  templateUrl: './password-forget.component.html',
  styleUrl: './password-forget.component.scss',
  imports: [
    FormsModule,
    CommonModule,
    FooterComponent,
    RouterModule,
    SmallBtnComponent,
    StartHeaderComponent,
  ],
})

export class PasswordForgetComponent {
  email: string = '';
  emailSentBtn = false;
  firestore: Firestore = inject(Firestore);
  constructor(private router: Router) {}

  passwordReset(ngForm: NgForm) {
    const auth = getAuth();
    sendPasswordResetEmail(auth, this.email)
      .then(() => {
        ngForm.resetForm(ngForm);
        // this.router.navigate(['/login']);  später zum weiter leiten einmal abklären 
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  }

  onSubmit(ngForm: NgForm) {
    this.passwordReset(ngForm);
    this.sendEmail();
  }

  sendEmail() {
    this.emailSentBtn = true;
    setTimeout(() => {
      this.emailSentBtn = false;
    }, 6000);
  }
}
