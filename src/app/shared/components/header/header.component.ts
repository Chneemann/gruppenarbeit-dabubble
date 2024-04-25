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
import { RouterLink } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, EditUserComponent, FormsModule, RouterLink],
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
    public sanitizer:DomSanitizer
  ) {}

  showSideMenu() {
    this.openMenu = !this.openMenu;
  }

  showProfile() {
    this.showCurrentProfile = true;
    this.closeProfil = false;
  }

  updateTestValue(value: boolean) {
    this.showCurrentProfile = value;
  }

  filterAllInfo(inputValue: string) {
    this.toggleBoolean.openSearchWindowHead = true;
    // event.stopPropagation;
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
    console.log('this.filteredUsers', this.filteredUsers);
    console.log('this.filteredChannels', this.filteredChannels);
  }


  getChannel(chatID: string): string {
    if (this.inputValue != '') {
      const filteredChat = this.filteredChats.find(
        (chat) => chat.channelId === chatID
      );
      if (filteredChat) {
        const channelName = this.channelService.allChannels.find(
          (channel) => channel.id === filteredChat.channelId
        );
        return channelName!.name;
      }
      return '';
    } else {
      return '';
    }
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
    this.filteredChats = this.highlightChatMessages(this.filteredChats, this.inputValue);
    console.log('this.filteredChats', this.filteredChats);
  }

  highlightChatMessages(chats: Chat[], searchTerm: string): Chat[] {
    return chats.map((chat) => {
      const highlightedMessage = chat.message.replace(
        new RegExp(searchTerm, 'gi'),
        (match) => this.sanitizer.bypassSecurityTrustHtml(`<p style="background-color: yellow;">${match}</p>`).toString()
      );
      return { ...chat, message: highlightedMessage };
    });
  }

  
  

  // highlightChatMessages(chats: Chat[], searchTerm: string): Chat[] {
  //   return chats.map((chat) => {
  //     const highlightedMessage = chat.message.replace(
  //       new RegExp(searchTerm, 'gi'), // 'gi' für globales und nicht-unterscheidendes Suchen
  //       (match) => `|${match}|`
  //     );
  //     return { ...chat, message: highlightedMessage };
  //   });
  // }
  

  getPrvChat(userID: string){
    const prvChats: string[] = [];
    const getUserRout = this.channelService.allPrvChannels.filter((channel) => channel.creatorId === userID);
    const getUserRout2 = this.channelService.allPrvChannels.some((channel) => channel.creatorId === userID);
    // console.log(getUserRout);
    // console.log(getUserRout2);
    if (getUserRout2) {
      for (const user of getUserRout) {
        const isPublicChannel = this.channelService.allPrvChannels.some(
          (prvChannel) => prvChannel.id === user.id
        );
        if (!isPublicChannel) {
          prvChats.push(user.id!);
        }
        
      }
      return prvChats;
    } else {
      return''
    }
    // for (const user of getUserRout) {
    //   fo
    // }

  }
  
  
}
