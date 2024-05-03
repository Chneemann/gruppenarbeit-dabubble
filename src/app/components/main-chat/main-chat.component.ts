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
  ],
  templateUrl: './main-chat.component.html',
  styleUrl: './main-chat.component.scss',
})
export class MainChatComponent {
  @Input() currentChannel: string = '';
  @Input() viewWidth: number = 0;

  openMenu: boolean = false;
  openEditNameInput: boolean = false;
  openEditNameDescription: boolean = false;
  nameValue: string = '';
  descriptionValue: string = '';
  firstLetter: string = '';
  openSearchWindow: boolean = false;
  getCurrentChannel: Channel[] = [];
  channelCreator: boolean = false;
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

  showMenu() {
    this.openMenu = true;
  }

  closeMenu() {
    this.openMenu = false;
    this.openEditNameDescription = false;
    this.openEditNameInput = false;
    this.descriptionValue = '';
    this.nameValue = '';
    this.getCurrentChannel = [];
  }

  preventCloseWhiteBox(event: Event) {
    event.stopPropagation();
  }

  editChannelName(event: Event) {
    event.stopPropagation();
    this.openEditNameInput = true;
    this.nameValue = this.getCurrentChannel[0].name;
  }

  saveEditChannelName(event: Event) {
    event.stopPropagation();
    this.openEditNameInput = false;
    this.channelService.saveAddedNameOrDescription(
      'channels',
      this.currentChannel!,
      'name',
      this.nameValue
    );
  }

  editChannelDescription(event: Event) {
    event.stopPropagation();
    this.openEditNameDescription = true;
    this.descriptionValue = this.getCurrentChannel[0].description || '';
  }

  saveEditChannelDescription(event: Event) {
    event.stopPropagation();
    this.openEditNameDescription = false;
    this.channelService.saveAddedNameOrDescription(
      'channels',
      this.currentChannel!,
      'description',
      this.descriptionValue
    );
  }

  checkCreator(currentChannel: string) {
    const getChannel = this.channelService.allChannels.filter(
      (channel) => channel.id == currentChannel
    );
    if (getChannel[0].creator === this.userService.userId) {
      return true;
    } else {
      return false;
    }
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
    this.getCurrentChannel = filteredTasks;
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

  leaveChannel(currentChannel: string, event: Event) {
    event.stopPropagation();
    const getLogedInUser: string = this.userService.userId;
    const getChannel = this.channelService.allChannels.filter(
      (channel) => channel.id == currentChannel
    );
    if (getChannel) {
      const userIndex = getChannel[0].addedUser.indexOf(getLogedInUser);

      if (userIndex) {
        getChannel[0].addedUser.splice(userIndex, 1);
        const userArray = getChannel[0].addedUser;
        this.channelService.addNewMemberToChannel(
          'channels',
          currentChannel,
          userArray,
          'leaveChannel'
        );
        this.openMenu = false;
        this.route.navigateByUrl(`main/XiqUAXRY1W7PixC9kVTa`);
      } else {
        console.warn('User not found in the channel');
      }
    }
  }
}
