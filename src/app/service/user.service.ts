import { Injectable, OnDestroy, inject } from '@angular/core';
import {
  Firestore,
  collection,
  doc,
  onSnapshot,
  updateDoc,
} from '@angular/fire/firestore';
import { User } from '../interface/user.interface';
import { ChannleService } from './channle.service';
import { getAuth, signOut } from 'firebase/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserService implements OnDestroy {
  firestore: Firestore = inject(Firestore);

  allUsers: User[] = [];
  getUserIDs: string[] = [];
  getFiltertUsers: User[] = [];
  isUserLogin: boolean = true;
  userId: string = '';

  unsubUser;

  constructor(private channelService: ChannleService, private route: Router) {
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

  createPrvChannel(filterUserID: string) {
    const newPrvChannel = {
      creatorId: this.userId,
      talkToUserId: filterUserID,
    };

    const channelExistsBoolean = this.channelService.allPrvChannels.some(
      (channel) =>
        (channel.creatorId === newPrvChannel.creatorId &&
          channel.talkToUserId === newPrvChannel.talkToUserId) ||
        (channel.creatorId === newPrvChannel.talkToUserId &&
          channel.talkToUserId === newPrvChannel.creatorId)
    );
    const channelExists = this.channelService.allPrvChannels.filter(
      (channel) =>
        (channel.creatorId === newPrvChannel.creatorId &&
          channel.talkToUserId === newPrvChannel.talkToUserId) ||
        (channel.creatorId === newPrvChannel.talkToUserId &&
          channel.talkToUserId === newPrvChannel.creatorId)
    );

    if (!channelExistsBoolean) {
      this.channelService.createNewChannel(newPrvChannel, 'prv-channels');
      console.log('prv channel angelegt');
    } else {
      console.log('Private channel already exists!', channelExists);
      return channelExists;
    }
    return '';
  }

  updateUserData(newFirstName: string, newLastName: string, newEmail: string) {
    const userDocRef = doc(this.firestore, 'users', this.userId);
    const updates = {
      firstName: newFirstName,
      lastName: newLastName || '',
      email: newEmail,
    };
    updateDoc(userDocRef, updates).catch((error) => {
      console.error(error);
    });
  }

  ngOnDestroy() {
    this.unsubUser();
  }

  currentUserLogout() {
    const auth = getAuth();
    const userId = this.userId;

    if (userId) {
      const userDocRef = doc(this.firestore, `users/${userId}`);

      updateDoc(userDocRef, { status: false })
        .then(() => {
          signOut(auth)
            .then(() => {
              this.route.navigate(['/login']);
            })
            .catch((error) => {
              console.error(error);
            });
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      console.error('Keine UserID gefunden');
    }
  }
}
