import { Component, Input } from '@angular/core';
import { UserService } from '../../service/user.service';
import { ChannleService } from '../../service/channle.service';
import { ChatService } from '../../service/chat.service';
import { Channel } from '../../interface/channel.interface';
import { MainComponent } from '../main/main.component';
import { SingleChatComponent } from '../main-chat/single-chat/single-chat.component';
import { Chat, ChatAnswers } from '../../interface/chat.interface';
import { CommonModule } from '@angular/common';
import { User } from '../../interface/user.interface';
import { ChatMsgBoxComponent } from '../main-chat/chat-msg-box/chat-msg-box.component';

@Component({
  selector: 'app-secondary-chat',
  standalone: true,
  imports: [
    MainComponent,
    SingleChatComponent,
    ChatMsgBoxComponent,
    CommonModule,
  ],
  templateUrl: './secondary-chat.component.html',
  styleUrl: './secondary-chat.component.scss',
})
export class SecondaryChatComponent {
  @Input() currentChannel: string = '';

  constructor(
    public userService: UserService,
    public channelService: ChannleService,
    public chatService: ChatService
  ) {}

  displayCountChatAnswer(chatId: string) {
    return this.chatService.getChatAnswers(chatId).length;
  }

  closeSecondaryChat() {
    this.chatService.isSecondaryChatId = '';
  }

  getChannels(): Channel[] {
    return this.channelService.allChannels;
  }

  getChats(): Chat[] {
    return this.chatService.allChats;
  }

  getChatAnswer(): ChatAnswers[] {
    return this.chatService.allChatAnswers;
  }

  getUsers(): User[] {
    return this.userService.allUsers;
  }

  getSingleChat(chatId: string): Chat[] {
    chatId = chatId.replace(/\s/g, '');
    const filteredTasks = this.getChats().filter((chat) => chat.id == chatId);
    return filteredTasks;
  }

  getChatAnswers(chatId: string): ChatAnswers[] {
    chatId = chatId.replace(/\s/g, '');
    const filteredTasks = this.getChatAnswer().filter(
      (chat) => chat.chatId == chatId
    );
    return filteredTasks;
  }

  getChatUsers(chatId: string) {
    chatId = chatId.replace(/\s/g, '');
    const filteredTasks = this.getUsers().filter((user) => user.id == chatId);
    return filteredTasks;
  }

  getChannelName() {
    this.currentChannel = this.currentChannel.replace(/\s/g, '');
    const filteredTasks = this.getChannels().filter(
      (channel) => channel.id == this.currentChannel
    );
    return filteredTasks;
  }

  getChatChannel(chatId: string) {
    chatId = chatId.replace(/\s/g, '');
    const filteredTasks = this.getChats().filter(
      (chat) => chat.channelId == chatId
    );
    return filteredTasks;
  }
}
