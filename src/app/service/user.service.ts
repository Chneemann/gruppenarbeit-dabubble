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
  // userId: string = '';
  userId: string = 'JX5JxxPx0sdjEPHCs5F9';

  unsubUser;

  constructor(private channelService: ChannleService, private route: Router) {
    this.unsubUser = this.subUserList();
  }

  /**
   * Subscribe to the list of users in Firestore.
   * @returns Unsubscribe function.
   */
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

  /**
   * Get all users.
   * @returns Array of User objects.
   */
  getUsers(): User[] {
    return this.allUsers;
  }

  /**
   * Get current user's data.
   * @returns Array containing current user's data.
   */
  getCurentUsers() {
    const filteredUser = this.getUsers().filter(
      (user) => user.id == this.userId
    );
    return filteredUser;
  }

  /**
   * Create a private channel between the current user and another user.
   * @param filterUserID ID of the user to create the private channel with.
   * @returns Existing private channel if it already exists, otherwise an empty string.
   */
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

  /**
   * Update current user's data in Firestore.
   * @param newFirstName New first name.
   * @param newLastName New last name.
   * @param newEmail New email.
   */
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

  /**
   * Clean up subscriptions when the service is destroyed.
   */

  ngOnDestroy() {
    this.unsubUser();
  }

  /**
   * Log out the current user.
   */
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
