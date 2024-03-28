import { Component, Input } from '@angular/core';
import { ChannleService } from '../../service/channle.service';
import { MainComponent } from '../main/main.component';
import { ChatService } from '../../service/chat.service';
import { UserService } from '../../service/user.service';
import { User } from '../../interface/user.interface';
import { Channel } from '../../interface/channel.interface';
import { Chat } from '../../interface/chat.interface';

@Component({
  selector: 'app-main-chat',
  standalone: true,
  imports: [MainComponent],
  templateUrl: './main-chat.component.html',
  styleUrl: './main-chat.component.scss',
})
export class MainChatComponent {
  @Input() currentChannel: string = '';

  constructor(
    public userService: UserService,
    public channelService: ChannleService,
    public chatService: ChatService
  ) {}

  getUsers(): User[] {
    return this.userService.allUsers;
  }

  getChatUsers(chatId: string) {
    chatId = chatId.replace(/\s/g, '');
    const filteredTasks = this.getUsers().filter((user) => user.id == chatId);
    return filteredTasks;
  }

  getChannels(): Channel[] {
    return this.channelService.allChannels;
  }

  getChats(): Chat[] {
    return this.chatService.allChats;
  }
}
