import {
  Component,
  ElementRef,
  Input
} from '@angular/core';
import { ChannleService } from '../../service/channle.service';
import { MainComponent } from '../main/main.component';
import { ChatService } from '../../service/chat.service';
import { UserService } from '../../service/user.service';
import { User } from '../../interface/user.interface';
import { Channel, PrvChannel } from '../../interface/channel.interface';
import { Chat } from '../../interface/chat.interface';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ChatContentComponent } from './chat-content/chat-content.component';
import { SingleChatComponent } from './single-chat/single-chat.component';
import { ToggleBooleanService } from '../../service/toggle-boolean.service';
import { ChatMsgBoxComponent } from './chat-msg-box/chat-msg-box.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-main-chat',
  standalone: true,
  imports: [
    MainComponent,
    CommonModule,
    ChatContentComponent,
    SingleChatComponent,
    ChatMsgBoxComponent,
    FormsModule,
  ],
  templateUrl: './main-chat.component.html',
  styleUrl: './main-chat.component.scss',
})
export class MainChatComponent {
  @Input() currentChannel: string = '';

  openMenu: boolean = false;
  firstLetter: string = '';
  openSearchWindow: boolean = false;
  constructor(
    private route: Router,
    public userService: UserService,
    public channelService: ChannleService,
    public chatService: ChatService,
    private elementRef: ElementRef,
    public tootleBoolean: ToggleBooleanService
  ) {
    if (this.currentChannel == '') {
      this.route.navigateByUrl('/main/XiqUAXRY1W7PixC9kVTa');
    }
  }

  showMenu() {
    this.openMenu = true;
  }

  closeMenu() {
    this.openMenu = false;
  }

  preventClose(event: MouseEvent) {
    if (this.elementRef.nativeElement.contains(event.target)) {
      const clickedElement = event.target as HTMLElement;
      const menuContent =
        this.elementRef.nativeElement.querySelector('.whiteBox');
      const closeBtn = this.elementRef.nativeElement.querySelector('.closeBtn');
      if (closeBtn.contains(clickedElement)) {
        this.closeMenu();
        event.stopPropagation();
      }
      if (!menuContent.contains(clickedElement)) {
        this.closeMenu();
        event.stopPropagation();
      }
    }
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

  getPrvChatArray(): PrvChannel[] {
    return this.channelService.allPrvChannels;
  }

  getChatUsers(chatId: string) {
    const filteredTasks = this.getUsers().filter((user) => user.id == chatId);
    return filteredTasks;
  }

  getChatChannel(chatId: string) {
    const filteredTasks = this.getChats().filter(
      (chat) => chat.channelId == chatId
    );
    return filteredTasks;
  }

  getChannelName(chatId: string) {
    const filteredTasks = this.getChannels().filter(
      (channel) => channel.id == chatId
    );
    return filteredTasks;
  }

  getPrvChat(prvChatId: string) {
    const filteredChats = this.getPrvChatArray().filter(
      (prvChat) => prvChat.id == prvChatId
    );

    return filteredChats;
  }

  filterUser(talkToUserId: string) {
    return this.userService.allUsers.filter((user) => user.id == talkToUserId);
  }

  checkCurrentChannel(currentChannel: string) {
    if (currentChannel === 'searchBar') {
      return 'searchBar';
    }
    const allChannels = this.channelService.allChannels.some(
      (channel) => channel.id == currentChannel
    );
    const allPrvChannels = this.channelService.allPrvChannels.some(
      (channel) => channel.id == currentChannel
    );
    if (allChannels) {
      return 'allChannels';
    } else if (allPrvChannels) {
      return 'allPrvChannels';
    }
    return '';
  }

  filterChannelAndUser(inputValue: string) {
    const filterChannels = '#';
    const filterUsers = '@';
    this.firstLetter = inputValue[0];
    if (this.firstLetter == filterChannels) {
      this.tootleBoolean.openSearchWindow = true;
      return 'filterChannel';
    } else if (this.firstLetter == filterUsers) {
      this.tootleBoolean.openSearchWindow = true;
      return 'filterUsers';
    }
    console.log(this.tootleBoolean.openSearchWindow);
    return (this.chatService.inputValue = '');
  }

  openUserProfil() {
    this.channelService.openPrvChat = true;
  }


  chooseElement(element: Channel | User) {
    if ('firstName' in element) {
      this.chatService.inputValue += `${element.firstName} ${element.lastName}`;
      this.chatService.getUserId = element.id!;
      // console.log(this.chatService.getUserId );
      
      // const getPrvChannel = this.chatService.allChats.filter((chat) => chat.userId == this.chatService.getUserId);
      // console.log(getPrvChannel[0].channelId!);
    } else {
      this.chatService.inputValue += element.name;
      this.chatService.getChannelId = element.id!;
    }
    this.tootleBoolean.openSearchWindow = false;
  }
  
  
  
  
}
