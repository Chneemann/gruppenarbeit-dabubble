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
import { Chat, ChatAnswers, ChatReactions } from '../interface/chat.interface';

@Injectable({
  providedIn: 'root',
})
export class ChatService implements OnDestroy {
  firestore: Firestore = inject(Firestore);

  allChats: Chat[] = [];
  allChatAnswers: ChatAnswers[] = [];
  allChatReactions: ChatReactions[] = [];
  isSecondaryChatId: string = '';
  openRightWindow: boolean = false;

  unsubChat;
  unsubChatAnswers;
  unsubChatReactions;

  constructor() {
    this.unsubChat = this.subChatList();
    this.unsubChatAnswers = this.subChatAnswersList();
    this.unsubChatReactions = this.subChatListReactions();
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

  subChatListReactions() {
    return onSnapshot(collection(this.firestore, 'reactions'), (list) => {
      this.allChatReactions = [];
      list.forEach((element) => {
        const chatReactionsWithId = {
          id: element.id,
          ...element.data(),
        } as ChatReactions;
        this.allChatReactions.push(chatReactionsWithId);
      });
    });
  }

  async updateChat(chatId: string, update: Partial<Chat>) {
    const chatRef = doc(collection(this.firestore, 'chats'), chatId);
    const updatedData = { ...update, edited: true };
    await updateDoc(chatRef, updatedData).catch((err) => {
      console.error(err);
      throw err;
    });
  }

  async updateReaction(reactionId: any, array: string[]) {
    await updateDoc(doc(collection(this.firestore, 'reactions'), reactionId), {
      userId: array,
    }).catch((err) => {
      console.error(err);
    });
  }

  getChatAnswers(chatId: string): ChatAnswers[] {
    const filteredTasks = this.allChatAnswers.filter(
      (chat) => chat.chatId == chatId
    );
    return filteredTasks;
  }

  ngOnDestroy() {
    this.unsubChat();
    this.unsubChatAnswers();
    this.unsubChatReactions();
  }
}
