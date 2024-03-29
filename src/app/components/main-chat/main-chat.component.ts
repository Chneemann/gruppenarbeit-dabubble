import { Component, Input } from '@angular/core';
import { ChannleService } from '../../service/channle.service';
import { MainComponent } from '../main/main.component';
import { ChatService } from '../../service/chat.service';
import { UserService } from '../../service/user.service';
import { User } from '../../interface/user.interface';
import { Channel } from '../../interface/channel.interface';
import { Chat } from '../../interface/chat.interface';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-main-chat',
  standalone: true,
  imports: [MainComponent, CommonModule],
  templateUrl: './main-chat.component.html',
  styleUrl: './main-chat.component.scss',
})
export class MainChatComponent {
  @Input() currentChannel: string = '';

  openMenu: boolean = true;

  constructor(
    private route: Router,
    public userService: UserService,
    public channelService: ChannleService,
    public chatService: ChatService
  ) {
    if (this.currentChannel == '') {
      this.route.navigateByUrl('/main/XiqUAXRY1W7PixC9kVTa');
    }
  }

  showMenu() {
    this.openMenu = !this.openMenu;
  }

  editChannelName() {}

  getUsers(): User[] {
    return this.userService.allUsers;
  }

  getChannels(): Channel[] {
    return this.channelService.allChannels;
  }

  getChats(): Chat[] {
    return this.chatService.allChats;
  }

  getChatUsers(chatId: string) {
    chatId = chatId.replace(/\s/g, '');
    const filteredTasks = this.getUsers().filter((user) => user.id == chatId);
    return filteredTasks;
  }

  getChatChannel(chatId: string) {
    chatId = chatId.replace(/\s/g, '');
    const filteredTasks = this.getChats().filter(
      (chat) => chat.channelId == chatId
    );
    return filteredTasks;
  }

  getChannelName(chatId: string) {
    chatId = chatId.replace(/\s/g, '');
    const filteredTasks = this.getChannels().filter(
      (channel) => channel.id == chatId
    );
    return filteredTasks;
  }
}
