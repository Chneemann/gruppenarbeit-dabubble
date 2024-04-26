import { Component, inject } from '@angular/core';
import { FooterComponent } from '../../../shared/components/login/footer/footer.component';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StartHeaderComponent } from '../../../shared/components/login/start-header/start-header.component';
import { SmallBtnComponent } from '../../../shared/components/small-btn/small-btn.component';
import { Router, ActivatedRoute } from '@angular/router';
import { getAuth } from 'firebase/auth';
import { confirmPasswordReset } from 'firebase/auth';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-password-reset',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    StartHeaderComponent,
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
  oobCode: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private queryParamsSubscription: Subscription
  ) {}

  ngOnInit(): void {
    this.queryParamsSubscription = this.route.queryParams.subscribe(
      (params) => {
        this.oobCode = params['oobCode'];
      }
    );
  }

  onSubmit(ngForm: NgForm): void {
    this.resetPassword(ngForm);
  }

  resetPassword(ngForm: NgForm): void {
    const auth = getAuth();
    const newPassword = this.passwordRepeat;
    confirmPasswordReset(auth, this.oobCode, newPassword)
      .then(() => {
        ngForm.resetForm();
        this.router.navigate(['/login']);
      })
      .catch((error) => {
        console.error('Fehler beim Zurücksetzen des Passworts:', error);
      });
  }

  ngOnDestroy(): void {
    this.queryParamsSubscription.unsubscribe();
  }

  passwordsMatch(): boolean {
    return this.password === this.passwordRepeat;
  }
}
