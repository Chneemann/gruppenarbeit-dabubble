import { Injectable, Input, OnDestroy, inject, input } from '@angular/core';
import { Firestore, addDoc, collection, onSnapshot } from '@angular/fire/firestore';
import { Channel } from '../interface/channel.interface';
import { User } from '../interface/user.interface';
import { UserService } from './user.service';
import { AddNewChannelComponent } from '../components/sidebar/sidebar-channels/add-new-channel/add-new-channel.component';

@Injectable({
  providedIn: 'root',
})
export class ChannleService implements OnDestroy {
  firestore: Firestore = inject(Firestore);

  allChannels: Channel[] = [];
  isSidebarOpen: boolean = true;
  showAddChannelBox: boolean = false;
  channelName: string = '';
  channelDescription: string = '';
  btnIsValid: boolean = false;
  privatChannel: boolean = false;
  getSelectedUsers: User[] = [];
  channelIsPrivat: boolean = false;
  shwoNextWindow: boolean = false;


  unsubChannel;

  constructor(private userServide: UserService) {
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


  async openAddNewChannelWindow(){
    this.showAddChannelBox = !this.showAddChannelBox;
    this.channelName = '';
    this.channelDescription = '';
    this.btnIsValid = false;
    this.getSelectedUsers = [];
    this.shwoNextWindow = false;
  }


  async addNewChannel(){
    await addDoc(this.firesorePath(), this.channelToJson()).catch(
    (err) => { console.error(err)}
  )
    this.openAddNewChannelWindow();
  }


  channelToJson(){
    return {
      creator: this.userServide.userId, // id später verändern jenachdem wer eingeloggt ist
      description: this.channelDescription,
      name: this.channelName,
      hashtag: this.privatChannel,
      addedUser: this.getSelectedUsers,
      privatChannel: this.channelIsPrivat
    }
  }

  ngOnDestroy() {
    this.unsubChannel();
  }
}
