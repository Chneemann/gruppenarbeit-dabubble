import { Component, inject } from '@angular/core';
import { loginService } from '../../../service/login.service';
import { Firestore } from '@angular/fire/firestore';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { FormControl, FormGroup, FormsModule, NgForm, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
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
  firestore: Firestore = inject(Firestore);
  email: string = '';
  password: string = '';

  constructor(private loginService: loginService) {}

  onSubmit(ngForm: NgForm) {
    console.log('LogingVersuch mit:', this.email, this.password);
    this.login();
    // ngForm.resetForm();
  }

  formGroup = new FormGroup({
    nameField: new FormControl('', Validators.required),
    emailField: new FormControl('', [Validators.required, Validators.email]),
    passwordField: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  login() {
    const auth = getAuth();
    
    if (!this.email || !this.password) {
      console.info('E-Mail und Passwort dürfen nicht leer sein.');
      return; // wens Validiert ist
    }

    signInWithEmailAndPassword(auth, this.email, this.password)
      .then((userCredential) => {
        // eingeloggt
        const user = userCredential.user;
        console.log('Eingeloggt als:', user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
  
        // Fehlerbehandlung bei aktuellem Fehlercode
        switch (errorCode) {
          case 'auth/user-not-found':
            console.info('Kein Benutzer mit dieser E-Mail gefunden.');
            break;
          case 'auth/wrong-password':
            console.info('Falsches Passwort.');
            break;
          case 'auth/invalid-email':
            console.info('Ungültiges E-Mail-Format.');
            break;
          case 'auth/invalid-credential':
            console.info('Ungültige Anmeldeinformationen. Bitte überprüfen Sie Ihre Eingaben.');
            break;
          default:
            console.info('Login-Fehler:', errorMessage);
        }
      });
  }
    }

