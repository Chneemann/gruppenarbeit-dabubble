import { Component, inject } from '@angular/core';
import { FooterComponent } from '../../../shared/components/login/footer/footer.component';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../../../shared/components/login/header/header.component';
import { SmallBtnComponent } from '../../../shared/components/small-btn/small-btn.component';
import { Firestore } from '@angular/fire/firestore';
import { Router, ActivatedRoute } from '@angular/router';
import { getAuth } from 'firebase/auth';
import { confirmPasswordReset } from 'firebase/auth';
import { User } from 'firebase/auth';

@Component({
  selector: 'app-password-reset',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    HeaderComponent,
    FooterComponent,
    RouterModule,
    SmallBtnComponent,
  ],
  templateUrl: './password-reset.component.html',
  styleUrl: './password-reset.component.scss',
})
export class PasswordResetComponent {
  password: string = '';
  passwordRepeat: string = '';
  firestore: Firestore = inject(Firestore);
  oobCode: string;

  constructor(private route: ActivatedRoute, private router: Router) {
    this.oobCode = '';
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.oobCode = params['oobCode'];
    });
  }

  onSubmit(ngForm: NgForm) {
    console.log('LogingVersuch mit:', this.password);
    this.resetPassword();

    // ngForm.resetForm();
  }
  resetPassword() {
    const auth = getAuth();
    const newPassword = this.passwordRepeat;

    confirmPasswordReset(auth, this.oobCode, newPassword)
      .then(() => {
        console.log('Dein Passwort wurde erfolgreich geändert!');
        // erfolgreich dan weiterleiten zu ->
        this.router.navigate(['/login']);
      })
      .catch((error) => {
        console.error('Fehler beim Zurücksetzen des Passworts:', error);
      });
  }

  passwordsMatch(): boolean {
    return this.password === this.passwordRepeat;
  }

  // ngOnDestroy(): void {
  //   this.queryParams.unsubscribe();
  // } hier wegen subscibe beenden nochmal nachfragen !
}
