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
        this.loadAllUserIDs(userWithId);
      });
    });
  }

  loadAllUserIDs(userWithId: User) {
    const isUserAlreadySelected = this.allUsers.find(
      (user) => user.id === userWithId.id
    );

    if (!isUserAlreadySelected) {
      this.getUserIDs.push(userWithId.id!);
    }
    console.log(this.getUserIDs);
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

