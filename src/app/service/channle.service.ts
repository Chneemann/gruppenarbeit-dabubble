import { Injectable, OnDestroy, inject } from '@angular/core';
import { Firestore, collection, onSnapshot } from '@angular/fire/firestore';
import { Channel } from '../interface/channel.interface';

@Injectable({
  providedIn: 'root',
})
export class ChannleService implements OnDestroy {
  firestore: Firestore = inject(Firestore);

  allChannels: Channel[] = [];

  unsubChannel;

  constructor() {
    this.unsubChannel = this.subChannelList();
  }

  subChannelList() {
    return onSnapshot(collection(this.firestore, 'channels'), (list) => {
      this.allChannels = [];
      list.forEach((element) => {
        this.allChannels.push(
          this.setChannelObject(element.data(), element.id)
        );
      });
    });
  }

  setChannelObject(obj: any, id: string): Channel {
    return {
      id: id,
      name: obj.name,
      description: obj.description,
      creator: obj.creator,
    };
  }

  ngOnDestroy() {
    this.unsubChannel();
  }
}
