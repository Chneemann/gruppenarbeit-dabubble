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
        this.allChats.push(this.setChatObject(element.data(), element.id));
      });
    });
  }

  subChatAnswersList() {
    return onSnapshot(collection(this.firestore, 'chat-answers'), (list) => {
      this.allChatAnswers = [];
      list.forEach((element) => {
        this.allChatAnswers.push(
          this.setChatAnswersObject(element.data(), element.id)
        );
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

  setChatAnswersObject(obj: any, id: string): ChatAnswers {
    return {
      id: id,
      chatId: obj.chatId,
      message: obj.message,
      publishedTimestamp: obj.publishedTimestamp,
      userId: obj.userId,
    };
  }

  ngOnDestroy() {
    this.unsubChat();
    this.unsubChatAnswers();
  }
}
