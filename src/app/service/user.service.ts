import { Injectable, OnDestroy, inject } from '@angular/core';
import {
  Firestore,
  collection,
  onSnapshot,
  query,
  where,
} from '@angular/fire/firestore';
import { User } from '../interface/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService implements OnDestroy {
  firestore: Firestore = inject(Firestore);

  allUsers: User[] = [];
  isUserLogin: boolean = true;
  userId: string ='PXp9TG7kkBniV9x2nHRr';
  
  unsubUser;

  constructor() {
    this.unsubUser = this.subUserList();
  }

  subUserList() {
    return onSnapshot(collection(this.firestore, 'users'), (list) => {
      this.allUsers = [];
      list.forEach((element) => {
        this.allUsers.push(this.setUserObject(element.data(), element.id));
      });
    });
  }

  setUserObject(obj: any, id: string): User {
    return {
      id: id,
      firstName: obj.firstName,
      lastName: obj.lastName,
      avatar: obj.avatar,
      email: obj.email,
      password: obj.password,
    };
  }

  
  getUsers(): User[] {
    return this.allUsers;
  }


  getCuurentUsers() {
    const filteredUser = this.getUsers().filter((user) => user.id == this.userId);
    return filteredUser;
  }

  ngOnDestroy() {
    this.unsubUser();
  }
}
