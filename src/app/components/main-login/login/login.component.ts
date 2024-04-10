import { Component, inject } from '@angular/core';
import { loginService } from '../../../service/login.service';

import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { FormControl, FormGroup, FormsModule, NgForm, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HeaderComponent } from "../../../shared/components/login/header/header.component";
import { FooterComponent } from "../../../shared/components/login/footer/footer.component";
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-login',
    standalone: true,
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss',
    imports: [FormsModule,CommonModule, HeaderComponent, FooterComponent,RouterLink]
})
export class LoginComponent {



  constructor(public loginService: loginService) {}

  onSubmit(ngForm: NgForm) {
    console.log('LogingVersuch mit:', this.loginService.email, this.loginService.password);
    this.loginService.login();
    // ngForm.resetForm();
  }

    }

