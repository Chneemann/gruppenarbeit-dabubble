import { Injectable, OnDestroy, inject } from '@angular/core';
import { Firestore, collection, onSnapshot } from '@angular/fire/firestore';
import { Channel } from '../interface/channel.interface';

@Injectable({
  providedIn: 'root',
})
export class ChannleService implements OnDestroy {
  firestore: Firestore = inject(Firestore);

  allChannels: Channel[] = [];
  isSidebarOpen: boolean = true;
  showAddChannelBox: boolean = false;

  unsubChannel;

  constructor() {
    this.unsubChannel = this.subChannelList();
  }

  subChannelList() {
    return onSnapshot(collection(this.firestore, 'channels'), (list) => {
      this.allChannels = [];
      list.forEach((element) => {
        const channelWithId = { id: element.id, ...element.data() } as Channel;
        this.allChannels.push(channelWithId);
      });
    });
  }

  addNewChannel(){
    this.showAddChannelBox = !this.showAddChannelBox;
  }

  ngOnDestroy() {
    this.unsubChannel();
  }
}
