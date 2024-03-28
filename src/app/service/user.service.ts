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
  allChatUsers: User[] = [];
  isUserLogin: boolean = true;

  unsubUser;
  unsubChannelUser;

  constructor() {
    this.unsubUser = this.subUserList();
    this.unsubChannelUser = this.subChannelUserList('a');
  }

  subUserList() {
    return onSnapshot(collection(this.firestore, 'users'), (list) => {
      this.allUsers = [];
      list.forEach((element) => {
        this.allUsers.push(this.setUserObject(element.data(), element.id));
      });
    });
  }

  subChannelUserList(chatId: string) {
    const q = query(
      collection(this.firestore, 'users'),
      where(chatId, '==', true)
    );
    return onSnapshot(q, (list) => {
      this.allChatUsers = [];
      list.forEach((element) => {
        this.allChatUsers.push(this.setUserObject(element.data(), element.id));
      });
    });
  }

  setUserObject(obj: any, id: string): User {
    return {
      id: id,
      firstName: obj.firstName || '',
      lastName: obj.lastName || '',
    };
  }

  ngOnDestroy() {
    this.unsubUser();
    this.unsubChannelUser();
  }
}
