import { Component } from '@angular/core';
import { loginService } from '../../../service/login.service';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { FooterComponent } from "../../../shared/components/login/footer/footer.component";
import { CommonModule } from '@angular/common';
import { StartHeaderComponent } from "../../../shared/components/login/start-header/start-header.component";

@Component({
    selector: 'app-login',
    standalone: true,
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss',
    imports: [FormsModule, CommonModule, FooterComponent, RouterLink, StartHeaderComponent]
})
export class LoginComponent {

  constructor(public loginService: loginService) {}

  onSubmit(ngForm: NgForm) {
    console.log('LogingVersuch mit:', this.loginService.email, this.loginService.password);
    this.loginService.login();
    // ngForm.resetForm();
  }
}