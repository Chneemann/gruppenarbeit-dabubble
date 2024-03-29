import { Injectable, inject } from '@angular/core';
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
export class UserService {
  firestore: Firestore = inject(Firestore);

  allUsers: User[] = [];
  isUserLogin: boolean = true;

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
    };
  }

  ngOnDestroy() {
    this.unsubUser();
  }
}
