import { Injectable, inject } from '@angular/core';
import { Firestore, collection, onSnapshot } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Channel } from '../interface/channel.interface';

@Injectable({
  providedIn: 'root',
})
export class ChannleService {
  firestore: Firestore = inject(Firestore);

  allChannels: Channel[] = [];
  channleMap: { [key: string]: Channel } = {};

  constructor() {
    this.subChannleList().subscribe(() => {
      this.organizeUserData();
    });
  }

  subChannleList() {
    return new Observable<void>((observer) => {
      const unsubscribe = onSnapshot(
        collection(this.firestore, 'channels'),
        (list) => {
          const channels: Channel[] = [];
          list.forEach((element) => {
            const taskData = { ...(element.data() as Channel), id: element.id };
            channels.push(taskData);
          });
          if (channels.length > 0) {
            this.allChannels = channels;
          }
          observer.next();
        }
      );
      return () => unsubscribe();
    });
  }

  organizeUserData() {
    this.channleMap = {};
    this.allChannels.forEach((channel) => {
      this.channleMap[channel.id] = channel;
    });
  }

  displayChannleDetails(id: string, query: keyof Channel) {
    return this.channleMap[id][query];
  }
}
