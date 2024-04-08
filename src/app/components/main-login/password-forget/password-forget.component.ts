import { Component } from '@angular/core';
import { FooterComponent } from "../../../shared/components/login/footer/footer.component";
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../../../shared/components/login/header/header.component';
import { SmallBtnComponent } from "../../../shared/components/small-btn/small-btn.component";

@Component({
    selector: 'app-password-forget',
    standalone: true,
    templateUrl: './password-forget.component.html',
    styleUrl: './password-forget.component.scss',
    imports: [FormsModule, CommonModule, HeaderComponent, FooterComponent, RouterModule, SmallBtnComponent]
})
export class PasswordForgetComponent {
  email: string = '';

  onSubmit(ngForm: NgForm) {
    console.log('LogingVersuch mit:', this.email);
   
    // ngForm.resetForm();
  }
}
