import { Injectable, inject, Component } from '@angular/core';
import {
  Firestore,
  addDoc,
  collection,
  getDocs,
  query,
  where,
} from '@angular/fire/firestore';
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
import { User } from '../interface/user.interface';
import { UserService } from './user.service';
// import { User } from 'firebase/auth';

@Injectable({
  providedIn: 'root',
})
export class loginService {
  firestore: Firestore = inject(Firestore);
  email: string = '';
  password: string = '';
  name: string = '';
  firstName: string = '';
  lastName: string = '';
  avatar: string = '/assets/img/user-icons/guest.svg';
  currentUser: string = '';

  constructor(private router: Router, private userService: UserService) {}
  // -------------------- login start seite ------------------------------->
  login() {
    const auth = getAuth();
    if (!this.email || !this.password) {
      console.info('E-Mail und Passwort dürfen nicht leer sein.');
      return; // Validierung fehlgeschlagen
    }

    signInWithEmailAndPassword(auth, this.email, this.password)
      .then((userCredential) => {
        // Eingeloggt
        const user = userCredential.user;
        console.log('Eingeloggt als:', user);

        const usersCollection = collection(this.firestore, 'users');
        const querySnapshot = query(
          usersCollection,
          where('uid', '==', user.uid)
        );
        getDocs(querySnapshot)
          .then((snapshot) => {
            if (snapshot.docs.length > 0) {
              const userDoc = snapshot.docs[0];
              this.currentUser = userDoc.id;
              console.log('UserLOGI', this.currentUser);
              this.userService.userId = this.currentUser;
              this.router.navigate([`/main`]); // hier log ich mir die docref aus und verwende die entweder hier oder später in main
            } else {
              console.error('Kein zugehöriges Benutzerdokument gefunden.');
            }
          })
          .catch((error) => {
            console.error('Fehler beim Abrufen des Benutzerdokuments:', error);
          });
      })
      .catch((error) => {
        // Fehlerbehandlung bei Authentifizierungsfehlern
        const errorCode = error.code;
        const errorMessage = error.message;

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

        const userDataToSave: User = {
          uid: user.uid,
          firstName: this.firstName,
          lastName: this.lastName,
          avatar: this.avatar,
          email: this.email,
        };

        this.createUserWithFirebase(userDataToSave);
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

    const usersCollection = collection(this.firestore, 'users');
    addDoc(usersCollection, user)
      .then((docRef) => {
        console.log('User successfully added to Firestore!');
        this.currentUser = docRef.id;
        console.log('UserREGI', this.currentUser);
        // this.router.navigate([`/main/${docRef.id}`]);
        this.login();
      })
      .catch((error) => {
        console.error('Error adding user to Firestore:', error);
      });
  }

  // -------------------- choose avatar ------------------------------->

  getAvatarUrl(url: string) {
    return (this.avatar = url);
  }
}
