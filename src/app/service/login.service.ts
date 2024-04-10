import { Injectable, inject,Component } from '@angular/core';
import {
  Firestore,
  addDoc,
  collection,
} from '@angular/fire/firestore';
import { User } from '../interface/user.interface';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { FormControl, FormGroup, FormsModule, NgForm, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class loginService {
  firestore: Firestore = inject(Firestore);
  email: string = '';
  password: string = '';
  constructor( private router: Router) {

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
        this.router.navigate(['/main']);
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



  // async addNewUser(userData: User) {
  //   await addDoc(collection(this.firestore, 'users'), userData)
  //     .catch((err) => {
  //       console.error(err);
  //     })
  //     .then((docRef) => {
  //       console.log('Document written with ID: ', docRef?.id);
  //     });
  // }
}