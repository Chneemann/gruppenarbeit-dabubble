import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  addDoc,
  collection,
  collectionData,
  onSnapshot,
  query,
  where,
} from '@angular/fire/firestore';
import { User } from '../models/user.class';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class loginService {
  firestore: Firestore = inject(Firestore);
  items$: Observable<any[]>;
  
  constructor() {
    const aCollection = collection(this.firestore, 'items');
    this.items$ = collectionData(aCollection);
  }

  async saveUser(userData: any) {
    
    const newUser = new User();
    newUser.firstName = userData.name;
    newUser.email = userData.email;
    newUser.password = userData.password; 

    await addDoc(this.getUserRef(), newUser.toJSON());
    console.log('User hinzugefügt:', newUser);
  }

  getUserRef() {
    return collection(this.firestore, 'users');
  }
}