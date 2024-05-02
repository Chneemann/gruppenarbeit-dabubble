import { Injectable, OnDestroy, inject } from '@angular/core';
import { Firestore, addDoc, collection, doc, onSnapshot, updateDoc } from '@angular/fire/firestore';
import { Channel, PrvChannel } from '../interface/channel.interface';



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
  loggedInUser: string= '';


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


  async saveAddedNameOrDescription(category: string, channelID: string, channelCategory: string, textValue: string) {
    const docRef = doc(this.firestore, `${category}/${channelID}`);
    await updateDoc(docRef, { [channelCategory]: textValue });
  }


  async createNewChannel(newChannel: Channel | PrvChannel, path: string): Promise<string | undefined> {
    try {
      const docRef = await addDoc(this.firesorePath(path), newChannel);
      return docRef.id;
    } catch (err) {
      console.error('Error creating channel:', err);
      return undefined;
    }
  }
  


  async addNewMemberToChannel(category: string ,channelID: string, selectedUsers: string [], checkCategory: string){
    if (checkCategory === 'addUserToChannel') {
      const allMembers: string[] = [...selectedUsers, ...this.channelMembers];
      const docRef = doc(this.firestore, `${category}/${channelID}`);
      await updateDoc(docRef, { addedUser: allMembers });
    }
    const docRef = doc(this.firestore, `${category}/${channelID}`);
    await updateDoc(docRef, { addedUser: selectedUsers });
  }

  ngOnDestroy() {
    this.unsubChannel();
    this.unsubPrvChannel();
  }
}
function commitBatch(batch: any) {
  throw new Error('Function not implemented.');
}

