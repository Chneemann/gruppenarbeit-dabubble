import { Injectable, inject } from '@angular/core';
import { Firestore, collection, onSnapshot } from '@angular/fire/firestore';
import { Chat } from '../interface/chat.interface';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  firestore: Firestore = inject(Firestore);

  allChats: Chat[] = [];

  unsubChat;

  constructor() {
    this.unsubChat = this.subChatList();
  }

  subChatList() {
    return onSnapshot(collection(this.firestore, 'chats'), (list) => {
      this.allChats = [];
      list.forEach((element) => {
        this.allChats.push(this.setChatObject(element.data(), element.id));
      });
    });
  }

  setChatObject(obj: any, id: string): Chat {
    return {
      id: id,
      userId: obj.userId,
      channelId: obj.channelId,
      message: obj.message,
      publishedTimestamp: obj.publishedTimestamp,
    };
  }

  ngOnDestroy() {
    this.unsubChat();
  }
}
