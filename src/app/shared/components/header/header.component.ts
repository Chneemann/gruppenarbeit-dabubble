import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { EditUserComponent } from './edit-user/edit-user.component';
import { UserService } from '../../../service/user.service';
import { User } from '../../../interface/user.interface';
import { ToggleBooleanService } from '../../../service/toggle-boolean.service';
import { FormsModule } from '@angular/forms';
import { ChannleService } from '../../../service/channle.service';
import { ChatService } from '../../../service/chat.service';
import { Channel } from '../../../interface/channel.interface';
import { Chat } from '../../../interface/chat.interface';
import { Router, RouterLink } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { HighlightPipe } from '../../../highlight.pipe';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, EditUserComponent, FormsModule, RouterLink, HighlightPipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  openMenu: boolean = false;
  showCurrentProfile: boolean = false;
  isOnline: boolean = true; //---- Zeige onlineStatus an
  closeProfil: boolean = false;
  openSearchWindow: boolean = false;
  inputValue: string = '';
  filteredUsers: User[] = [];
  filteredChannels: Channel[] = [];
  filteredChats: Chat[] = [];


  constructor(
    public userService: UserService,
    public toggleBoolean: ToggleBooleanService,
    private channelService: ChannleService,
    private chatService: ChatService,
    public sanitizer:DomSanitizer,
    private route: Router
  ) {}

  
  showSideMenu() {
    this.openMenu = !this.openMenu;
  }


  showProfile() {
    this.showCurrentProfile = true;
    this.closeProfil = false;
  }

  logout(): void {
    this.userService.currentUserLogout();
  }


  updateTestValue(value: boolean) {
    this.showCurrentProfile = value;
  }



  filterAllInfo(inputValue: string) {
    this.toggleBoolean.openSearchWindowHead = true;
    const getInputValue = inputValue.toLowerCase().trim();
    this.filterUsersChannelsChats(getInputValue);
  
  }

  filterUsersChannelsChats(inputValue: string) {
    const filterUsers = this.userService.getUsers().filter((user) => {
      const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
      return fullName.includes(inputValue);
    });

    const filterChannels = this.channelService.allChannels.filter((channel) => {
      const channelName = `${channel.name}`.toLowerCase();
      return channelName.includes(inputValue);
    });

    const filterChants = this.chatService.allChats.filter((chat) => {
      const chatMessage = `${chat.message}`.toLowerCase();
      return chatMessage.includes(inputValue);
    });

    this.sortPrvAndPublicMessages(filterChants);

    this.filteredUsers = filterUsers;
    this.filteredChannels = filterChannels;
  }


  getChannel(chatID: string){
    if (this.inputValue != '') {
      const filteredChatBoolean = this.filteredChats.some(
        (chat) => chat.channelId === chatID
      );
      if (filteredChatBoolean) {
        const filteredChat = this.filteredChats.find(
            (chat) => chat.channelId === chatID
          );
        const channelName = this.channelService.allChannels.find(
          (channel) => channel.id === filteredChat!.channelId
        );
        return  channelName!.name;
      }
    } else {
      return '';
    }
    return  '';
  }


  sortPrvAndPublicMessages(chats: Chat[]) {
    const publicChats: Chat[] = [];

    for (const chat of chats) {
      const isPublicChannel = this.channelService.allPrvChannels.some(
        (prvChannel) => prvChannel.id === chat.channelId
      );
      if (!isPublicChannel) {
        publicChats.push(chat);
      }
    }
    this.filteredChats = publicChats;
  }

  
  checkRoute(user: User[]){
    const userId = user[0].id!;
    const channelExistsBoolean = this.channelService.allPrvChannels.some(
      (channel) =>
        (channel.creatorId === userId && channel.talkToUserId === this.userService.userId) ||
        (channel.creatorId === this.userService.userId && channel.talkToUserId === userId)
    );
    if (!channelExistsBoolean) {
      this.userService.createPrvChannel(userId);
      console.log('New private channel created');
    } 
    this.getRouteToPrvChat(userId, channelExistsBoolean);
  }


  getRouteToPrvChat(userId: string, channelExistsBoolean: boolean){
    if (channelExistsBoolean) {
      const existingChannel = this.channelService.allPrvChannels.find(
        (channel) =>
          (channel.creatorId === userId && channel.talkToUserId === this.userService.userId) ||
          (channel.creatorId === this.userService.userId && channel.talkToUserId === userId)
      );
      console.log(`/main/${existingChannel!.id}`);
      
      this.route.navigateByUrl(`main/${existingChannel!.id}`); 
    }
  }

}
