import { Component } from '@angular/core';
import { FooterComponent } from "../../../shared/components/login/footer/footer.component";
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../../../shared/components/login/header/header.component';
import { SmallBtnComponent } from "../../../shared/components/small-btn/small-btn.component";


@Component({
  selector: 'app-password-reset',
  standalone: true,
  imports: [FormsModule, CommonModule, HeaderComponent, FooterComponent, RouterModule, SmallBtnComponent],
  templateUrl: './password-reset.component.html',
  styleUrl: './password-reset.component.scss'
})
export class PasswordResetComponent {
  password: string = '';
  passwordRepeat: string = '';

  onSubmit(ngForm: NgForm) {
    console.log('LogingVersuch mit:', this.password);
   
    // ngForm.resetForm();
  }
  passwordsMatch(): boolean {
    return this.password === this.passwordRepeat;
  }

}
