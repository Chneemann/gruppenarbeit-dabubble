import { Injectable, OnDestroy, inject } from '@angular/core';
import { Firestore, collection, onSnapshot } from '@angular/fire/firestore';
import { Chat, ChatAnswers } from '../interface/chat.interface';

@Injectable({
  providedIn: 'root',
})
export class ChatService implements OnDestroy {
  firestore: Firestore = inject(Firestore);

  allChats: Chat[] = [];
  allChatAnswers: ChatAnswers[] = [];
  isSecondaryChatId: string = '';

  unsubChat;
  unsubChatAnswers;

  constructor() {
    this.unsubChat = this.subChatList();
    this.unsubChatAnswers = this.subChatAnswersList();
  }

  subChatList() {
    return onSnapshot(collection(this.firestore, 'chats'), (list) => {
      this.allChats = [];
      list.forEach((element) => {
        const chatWithId = { id: element.id, ...element.data() } as Chat;
        this.allChats.push(chatWithId);
      });
    });
  }

  subChatAnswersList() {
    return onSnapshot(collection(this.firestore, 'chat-answers'), (list) => {
      this.allChatAnswers = [];
      list.forEach((element) => {
        const chatWithId = { id: element.id, ...element.data() } as ChatAnswers;
        this.allChatAnswers.push(chatWithId);
      });
    });
  }

  ngOnDestroy() {
    this.unsubChat();
    this.unsubChatAnswers();
  }
}
