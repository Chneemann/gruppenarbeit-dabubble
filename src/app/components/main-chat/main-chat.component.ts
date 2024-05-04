import { Component, ElementRef, Input } from '@angular/core';
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
import { SmallBtnComponent } from '../../shared/components/small-btn/small-btn.component';
import { ShowChannelMemberComponent } from './show-channel-member/show-channel-member.component';
import { SharedService } from '../../service/shared.service';
import { ChannelInformationsComponent } from './channel-informations/channel-informations.component';

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
    SmallBtnComponent,
    ShowChannelMemberComponent,
    ChannelInformationsComponent,
  ],
  templateUrl: './main-chat.component.html',
  styleUrl: './main-chat.component.scss',
})
export class MainChatComponent {
  @Input() currentChannel: string = '';
  @Input() viewWidth: number = 0;

  firstLetter: string = '';
  openSearchWindow: boolean = false;
  channelCreator: boolean = false;
  openMenu: boolean = false;

  constructor(
    private route: Router,
    public userService: UserService,
    public channelService: ChannleService,
    public chatService: ChatService,
    public toggleBoolean: ToggleBooleanService,
    private sharedService: SharedService
  ) {
    if (this.currentChannel == '' && this.userService.userId !== '') {
      this.route.navigateByUrl('/main/XiqUAXRY1W7PixC9kVTa');
    }
  }

  RESPONSIVE_THRESHOLD_MOBILE = this.sharedService.RESPONSIVE_THRESHOLD_MOBILE;

  closeEditEmitter(variable: boolean) {
    this.openMenu = variable;
    console.log(this.openMenu);
  }

  showMenu() {
    this.openMenu = true;
  }

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
      this.toggleBoolean.openSearchWindow = true;
      return 'filterChannel';
    } else if (this.firstLetter == filterUsers) {
      this.toggleBoolean.openSearchWindow = true;
      return 'filterUsers';
    }
    return (this.chatService.inputValue = '');
  }

  openUserProfil() {
    this.channelService.openPrvChat = true;
  }

  chooseElement(element: Channel | User) {
    if ('firstName' in element) {
      this.chatService.inputValue += `${element.firstName} ${element.lastName}`;
      const getUserID = element.id!;
      const getPrvChannel = this.channelService.allPrvChannels.filter(
        (chat) => chat.talkToUserId == getUserID
      );
      this.chatService.getPrvChatId = getPrvChannel[0].id!;
    } else {
      this.chatService.inputValue += element.name;
      this.chatService.getChannelId = element.id!;
    }
    this.toggleBoolean.openSearchWindow = false;
  }

  filterChannelForSelectedUser(currentChannel: string) {
    const getBoolean = this.channelService.allChannels.some(
      (channel) => channel.id == currentChannel
    );
    const getAddedUsers = this.channelService.allChannels.filter(
      (channel) => channel.id == currentChannel
    );
    this.filterUsers(getAddedUsers[0].addedUser);
    return getBoolean;
  }

  filterUsers(userArray: string[]) {
    this.userService.getFiltertUsers = [];
    for (let i = 0; i < this.userService.allUsers.length; i++) {
      const currentUser = this.userService.allUsers[i];
      if (userArray.includes(currentUser.id!)) {
        this.userService.getFiltertUsers.push(currentUser);
      }
    }
  }

  openMemberWindow(boolean: boolean) {
    this.toggleBoolean.openChannelMemberWindow = true;
    this.toggleBoolean.openAddMemberWindow(boolean);
  }
}
