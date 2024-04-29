import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  QuerySnapshot,
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
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
import { Router } from '@angular/router';
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
    signInWithEmailAndPassword(auth, this.email, this.password)
      .then((userCredential) => {
        const user = userCredential.user;
        const usersCollection = collection(this.firestore, 'users');
        const querySnapshot = query(
          usersCollection,
          where('uid', '==', user.uid)
        );
        getDocs(querySnapshot)
          .then((snapshot) => this.userDocument(snapshot))
          .catch((error) => {
            console.error('Fehler beim Abrufen des Benutzerdokuments:', error);
          });
      })
      .catch((error) => {
        const errorCode = error.code;
        this.switchCase(errorCode);
      });
  }

  userDocument(snapshot: QuerySnapshot) {
    {
      if (snapshot.docs.length > 0) {
        const userDoc = snapshot.docs[0];
        this.currentUser = userDoc.id;
        this.userService.userId = this.currentUser;
        this.updateUserOnlineStatus(this.currentUser);
        this.router.navigate([`/main`]);
      } else {
        console.error('Kein zugehöriges Benutzerdokument gefunden.');
      }
    }
  }

  switchCase(errorCode: string) {
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
  }

  updateUserOnlineStatus(userId: string) {
    const userDocRef = doc(this.firestore, 'users', userId);
    const updates = {
      status: true,
    };
    updateDoc(userDocRef, updates)
      .then(() => {
        console.error();
      })
      .catch((error) => {
        console.error(error);
      });
  }

  guestLogin() {
    const auth = getAuth();
    const email = 'guest@guestaccount.com';
    const password = 'guest@guestaccount.com';
    const userId = 'JX5JxxPx0sdjEPHCs5F9';

    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        this.userService.userId = userId;
        this.updateUserOnlineStatus(userId);
        this.router.navigate(['/main']);
      })
      .catch((error) => {
        console.error(error);
        this.errorMessage =
          'Fehler bei der Gastanmeldung. Bitte versuchen Sie es später erneut.';
      });
  }
  // -------------------- register ------------------------------->

  register() {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, this.email, this.password)
      .then((userCredential) => {
        const user = userCredential.user;

        const userDataToSave: User = {
          uid: user.uid,
          firstName: this.firstName,
          lastName: this.lastName,
          avatar: this.avatar,
          email: this.email,
          status: true,
        };

        this.createUserInFirestore(userDataToSave);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  createUserInFirestore(user: User) {
    const userDataToSave: User = {
      uid: user.uid,
      email: user.email,
      firstName: user.firstName || '',
      lastName: user.lastName || '',
      avatar: user.avatar || '/assets/img/user-icons/guest.svg',
      status: true,
    };
    const usersCollection = collection(this.firestore, 'users');
    addDoc(usersCollection, userDataToSave)
      .then((docRef) => {
        this.currentUser = docRef.id;
        this.userService.userId = this.currentUser;
        this.router.navigate([`/main`]);
      })
      .catch((error) => {
        console.error(error);
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
        const user = result.user;
        const usersCollection = collection(this.firestore, 'users');
        const querySnapshot = query(
          usersCollection,
          where('uid', '==', user.uid)
        );
        getDocs(querySnapshot).then((snapshot) => {
          if (snapshot.empty) {
            this.createUserInFirestore({
              uid: user.uid,
              email: user.email || 'leer@gmail.com',
              firstName: user.displayName
                ? user.displayName.split(' ')[0]
                : 'FirstName',
              lastName: user.displayName
                ? user.displayName.split(' ').slice(1).join(' ')
                : 'LastName',
              avatar: user.photoURL || '/assets/img/user-icons/guest.svg',
              status: true,
            });
          } else {
            this.ifExistUser(snapshot)
          }
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  ifExistUser(snapshot:QuerySnapshot){
    this.currentUser = snapshot.docs[0].id;
    this.userService.userId = this.currentUser;
    this.router.navigate([`/main`]);
  }
}
