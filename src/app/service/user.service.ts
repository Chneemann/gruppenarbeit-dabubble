import { Injectable, OnDestroy, inject } from '@angular/core';
import { Firestore, collection, onSnapshot } from '@angular/fire/firestore';
import { User } from '../interface/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService implements OnDestroy {
  firestore: Firestore = inject(Firestore);

  allUsers: User[] = [];
  getUserIDs: string[] = [];
  isUserLogin: boolean = true;
  userId: string = 'C2p2Dm1au4l6cyyMBrWo';
  getPrvChetUserId: string = '';

  
  unsubUser;

  constructor() {
    this.unsubUser = this.subUserList();
  }

  
  subUserList() {
    return onSnapshot(collection(this.firestore, 'users'), (list) => {
      this.allUsers = [];
      this.getUserIDs = [];
      list.forEach((element) => {
        const userWithId = { id: element.id, ...element.data() } as User;
        this.allUsers.push(userWithId);
        this.getUserIDs.push(userWithId.id!);
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
