import { Injectable, OnDestroy, inject } from '@angular/core';
import { Firestore, addDoc, collection, onSnapshot } from '@angular/fire/firestore';
import { Channel } from '../interface/channel.interface';


@Injectable({
  providedIn: 'root',
})
export class ChannleService implements OnDestroy {
  firestore: Firestore = inject(Firestore);

  allChannels: Channel[] = [];
  isSidebarOpen: boolean = true;
  showAddChannelBox: boolean = false;
  btnIsValid: boolean = false;


  unsubChannel;

  constructor() {
    this.unsubChannel = this.subChannelList();
  }


  firesorePath(){
   return collection(this.firestore, 'channels');
  }


  subChannelList() {
    return onSnapshot(this.firesorePath(), (list) => {
      this.allChannels = [];
      list.forEach((element) => {
        const channelWithId = { id: element.id, ...element.data() } as Channel;
        this.allChannels.push(channelWithId);
      });
    });
  }


  async createNewChannel(newChannel: Channel){
    await addDoc(this.firesorePath(), newChannel).catch(
    (err) => { console.error(err)});
  }


  ngOnDestroy() {
    this.unsubChannel();
  }
}
