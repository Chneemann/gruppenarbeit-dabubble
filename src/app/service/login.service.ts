import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  addDoc,
  collection,
} from '@angular/fire/firestore';
import { User } from '../interface/user.interface';

@Injectable({
  providedIn: 'root',
})
export class loginService {
  firestore: Firestore = inject(Firestore);
  constructor() {

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