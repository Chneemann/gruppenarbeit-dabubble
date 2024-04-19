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
  signInWithPopup,
  GoogleAuthProvider,
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
  errorMessage: string = '';
  private hasAnimationPlayed = false;
  private introCompleteStatus = false;

  constructor(private router: Router, private userService: UserService) {}
  // -------------------- login start seite ------------------------------->
  login() {
    const auth = getAuth();
    if (!this.email || !this.password) {
      this.errorMessage = 'E-Mail und Passwort dürfen nicht leer sein.';
      return;
    }

    signInWithEmailAndPassword(auth, this.email, this.password)
      .then((userCredential) => {
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
              this.router.navigate([`/main`]);
            } else {
              console.info('Kein zugehöriges Benutzerdokument gefunden.');
            }
          })
          .catch((error) => {
            console.info('Fehler beim Abrufen des Benutzerdokuments:', error);
          });
      })
      .catch((error) => {
        const errorCode = error.code;
        switch (errorCode) {
          case 'auth/invalid-credential':
            this.errorMessage =
              '*Ungültige Anmeldeinformationen. Bitte überprüfen Sie Ihre Eingaben.';
            break;
          case 'auth/too-many-requests':
            this.errorMessage =
              '*Der Zugriff auf dieses Konto wurde aufgrund zahlreicher fehlgeschlagener Anmeldeversuche vorübergehend deaktiviert.';
            break;
          default:
            this.errorMessage = '*Bitte Überprüfe deine Eingaben.';
            break;
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
  // -------------------- animation login------------------------------->
  getAnimationState(): boolean {
    return this.hasAnimationPlayed;
  }
  getFinalclass(): boolean {
    return this.introCompleteStatus;
  }

  setAnimationState(state: boolean): void {
    this.hasAnimationPlayed = state;
  }
  setFinalClass(state: boolean): void {
    this.introCompleteStatus = state;
  }
  //------------------------ GoogleLogin -------------------------------------------->
  googleLogin() {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
      .then((result) => {
       
        const credential = GoogleAuthProvider.credentialFromResult(result);
        if (credential) {
          const token = credential.accessToken; 
       
          const user = result.user;
          console.log('Name: ', user.displayName);
          console.log('E-Mail: ', user.email);
          console.log('Profilbild URL: ', user.photoURL);
        } else {
          console.error('Keine Anmeldeinformationen erhalten.');
        }
      })
      .catch((error) => {
      
        const errorCode = error.code;
        const errorMessage = error.message;
      
        const email = error.customData.email;
    
        const credential = GoogleAuthProvider.credentialFromError(error);
       
      });
  }
}
