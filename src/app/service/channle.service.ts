import { Injectable, inject } from '@angular/core';
import { Firestore, collection, onSnapshot } from '@angular/fire/firestore';
import { Channel } from '../interface/channel.interface';

@Injectable({
  providedIn: 'root',
})
export class ChannleService {
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
      name: obj.name || '',
      description: obj.description,
    };
  }

  ngOnDestroy() {
    this.unsubChannel();
  }
}
