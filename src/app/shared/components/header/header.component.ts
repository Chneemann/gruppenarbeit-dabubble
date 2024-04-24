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

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, EditUserComponent, FormsModule],
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
  filteredUsers: User [] = [];
  filteredChannels: Channel [] = [];
  filteredChats: Chat [] = [];

  constructor(
    public userService: UserService,
    public toggleBoolean: ToggleBooleanService,
    private channelService: ChannleService,
    private chatService: ChatService
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

  filterAllInfo( inputValue: string) {
    this.toggleBoolean.openSearchWindowHead = true;
    // event.stopPropagation;
    const getInputValue = inputValue.toLowerCase().trim();

    this.filterUsersChannelsChats(getInputValue);
  }


  filterUsersChannelsChats(inputValue: string){
    const filterUsers = this.userService.getUsers().filter((user) => {
      const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
      return fullName.includes(inputValue);
    });
    console.log('filterUsers', filterUsers);
    
    const filterChannels = this.channelService.allChannels.filter(channel => {
      const channelName = `${channel.name}`.toLowerCase();
      return channelName.includes(inputValue);
    });
    console.log('filterChannels', filterChannels);

    const filterChants = this.chatService.allChats.filter(chat => {
      const chatMessage = `${chat.message}`.toLowerCase();
      return chatMessage.includes(inputValue);
    });
    console.log('filterChants', filterChants);

    this.filteredUsers = filterUsers;
    this.filteredChannels = filterChannels;
    this.filteredChats = filterChants;
  }


  getChannel(chatID: string){
    const filterChannelName = this.channelService.allChannels.filter( channel => channel.id === chatID);
    return filterChannelName[0].name;
  }


}
