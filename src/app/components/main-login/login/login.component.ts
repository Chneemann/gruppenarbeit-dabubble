import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { loginService } from '../../../service/login.service';
import { Firestore } from '@angular/fire/firestore';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  firestore: Firestore = inject(Firestore);
  email: string = '';
  password: string = '';
  name: string = '';

  constructor() {}
  onSubmit(form: NgForm) {
    console.log('LogingVersuch mit:', this.email, this.password);
    this.login();
    // form.resetForm();
  }

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

