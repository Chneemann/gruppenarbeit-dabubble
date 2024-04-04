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
  userId: string = 'PXp9TG7kkBniV9x2nHRr';

  unsubUser;

  constructor() {
    this.unsubUser = this.subUserList();
  }

  subUserList() {
    return onSnapshot(collection(this.firestore, 'users'), (list) => {
      this.allUsers = [];
      list.forEach((element) => {
        const userWithId = { id: element.id, ...element.data() } as User;
        this.allUsers.push(userWithId);
      });
    });
  }

  getUsers(): User[] {
    return this.allUsers;
  }

  getCurentUsers() {
    const filteredUser = this.getUsers().filter(
      (user) => user.id == this.userId
    );
    return filteredUser;
  }

  ngOnDestroy() {
    this.unsubUser();
  }
}
