import { Injectable, OnDestroy, inject } from '@angular/core';
import {
  Firestore,
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
} from '@angular/fire/firestore';
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
    const queryRef = query(
      collection(this.firestore, 'chats'),
      orderBy('publishedTimestamp')
    );

    return onSnapshot(queryRef, (list) => {
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

  async updateChat(chatId: string, update: Partial<Chat>) {
    const chatRef = doc(collection(this.firestore, 'chats'), chatId);
    await updateDoc(chatRef, update).catch((err) => {
      console.error(err);
      throw err;
    });
  }

  getChatAnswers(chatId: string): ChatAnswers[] {
    chatId = chatId.replace(/\s/g, '');
    const filteredTasks = this.allChatAnswers.filter(
      (chat) => chat.chatId == chatId
    );
    return filteredTasks;
  }

  ngOnDestroy() {
    this.unsubChat();
    this.unsubChatAnswers();
  }
}
