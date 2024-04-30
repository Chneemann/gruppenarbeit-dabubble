import { Injectable, OnDestroy, inject } from '@angular/core';
import { Firestore, addDoc, collection, doc, onSnapshot, updateDoc } from '@angular/fire/firestore';
import { Channel, PrvChannel } from '../interface/channel.interface';
import { DownloadFilesService } from './download-files.service';


@Injectable({
  providedIn: 'root',
})
export class ChannleService implements OnDestroy {
  firestore: Firestore = inject(Firestore);

  allChannels: Channel[] = [];
  isSidebarOpen: boolean = true;
  showAddChannelBox: boolean = false;
  btnIsValid: boolean = false;
  saveEditBtnIsValid: boolean = false;
  openPrvChat: boolean = false;
  allPrvChannels: PrvChannel[] = [];
  channelMembers: string [] = [];


  unsubChannel;
  unsubPrvChannel;

  constructor() {
    this.unsubChannel = this.subChannelList();
    this.unsubPrvChannel = this.subPrvChannelList(); 
  }


  firesorePath(path: string){
   return collection(this.firestore, path);
  }


  subChannelList() {
    return onSnapshot(this.firesorePath('channels'), (list) => {
      this.allChannels = [];
      list.forEach((element) => {
        const channelWithId = { id: element.id, ...element.data() } as Channel;
        this.allChannels.push(channelWithId);
      });
    });
  }


  subPrvChannelList() {
    return onSnapshot(this.firesorePath('prv-channels'), (list) => {
      this.allPrvChannels = [];
      list.forEach((element) => {
        const channelWithId = { id: element.id, ...element.data() } as PrvChannel;
        this.allPrvChannels.push(channelWithId);
      });
    });
  }


  async createNewChannel(newChannel: Channel | PrvChannel, path: string){
    await addDoc(this.firesorePath(path), newChannel).catch(
    (err) => { console.error(err)});
  }


  async addNewMemberToChannel(category: string ,channelID: string, selectedUsers: string []){
    const allMembers: string[] = [...selectedUsers, ...this.channelMembers];
    const docRef = doc(this.firestore, `${category}/${channelID}`);
    await updateDoc(docRef, { addedUser: allMembers });
  }

  ngOnDestroy() {
    this.unsubChannel();
    this.unsubPrvChannel();
  }
}
