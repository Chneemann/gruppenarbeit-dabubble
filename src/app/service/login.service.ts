import { Injectable, inject, Component } from '@angular/core';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';
// import { User } from '../interface/user.interface';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth';
import {
  FormControl,
  FormGroup,
  FormsModule,
  NgForm,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { User } from 'firebase/auth';

@Injectable({
  providedIn: 'root',
})
export class loginService {
  firestore: Firestore = inject(Firestore);
  email: string = '';
  password: string = '';
  name: string = '';
  avatar: string = '/assets/img/charater1.svg';

  constructor(private router: Router) {}
  // -------------------- login start seite ------------------------------->
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
            console.info(
              'Ungültige Anmeldeinformationen. Bitte überprüfen Sie Ihre Eingaben.'
            );
            break;
          default:
            console.info('Login-Fehler:', errorMessage);
        }
      });
  }
  // -------------------- register ------------------------------->

  register() {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, this.email, this.password)
      .then((userCredential) => {
        // erfolgreiche registrierung
        const user = userCredential.user;

        this.createUserWithFirebase(user);
      })
      .catch((error) => {
        console.error('Registration error:', error);
      });
  }

  createUserWithFirebase(user: User) {
    if (!user || !user.uid) {
      console.error('User or user UID is undefined.');
      return;
    }
    const userDataToSave = {
      email: this.email,
      user: user.uid,
      name: this.name,
      avatar: this.avatar,
    };

    const usersCollection = collection(this.firestore, 'users');
    addDoc(usersCollection, userDataToSave)
      .then(() => {
        console.log('User successfully added to Firestore!');
      })
      .catch((error) => {
        console.error('Error adding user to Firestore:', error);
      });
    this.login();
  }

  // -------------------- choose avatar ------------------------------->

  getAvatarUrl(url: string) {
    return (this.avatar = url);
  }
}
