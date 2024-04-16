import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ChannleService } from '../../../../service/channle.service';
import { SmallBtnComponent } from '../../../../shared/components/small-btn/small-btn.component';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../../../service/user.service';
import { User } from '../../../../interface/user.interface';
import { Channel } from '../../../../interface/channel.interface';

@Component({
  selector: 'app-add-new-channel',
  standalone: true,
  imports: [CommonModule, SmallBtnComponent, FormsModule],
  templateUrl: './add-new-channel.component.html',
  styleUrl: './add-new-channel.component.scss'
})
export class AddNewChannelComponent {
  changeImg: boolean = false;
  userName: string = '';
  showExistenUsers: boolean = false;
  getSearchedUser: User[] = [];
  channelName: string = '';
  channelDescription: string = '';
  privatChannel: boolean = false;
  getSelectedUsers: User[] = [];
  selectedUsers: string[] = [];
  testarray: string[] = [];
  channelIsPrivat: boolean = false;
  shwoNextWindow: boolean = false;


  constructor(public channelService: ChannleService, public userService: UserService){}


  toggleShowAddChannelBox(){
    this.channelService.showAddChannelBox = !this.channelService.showAddChannelBox;
    this.shwoNextWindow = false;
  }


  createNewChannel(){
    this.shwoNextWindow = !this.shwoNextWindow;
  }


  toggleBtnTrue(){
    this.changeImg = true;
    this.channelIsPrivat = true;
  }


  toggleBtnFalse(){
    this.changeImg = false;
    this.channelIsPrivat = false;
  }


  filterUsers(userName: string) {
    this.showExistenUsers = true;
    this.getSearchedUser = [];
    const searchedUser = userName.toLowerCase().trim();
    const filteredUsers = this.userService.getUsers().filter(user => {
      const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
      return fullName.includes(searchedUser);
    });
    this.getSearchedUser.push(...filteredUsers);
  }
  

  chooseUser(user: User) {
    const isUserAlreadySelected = this.getSelectedUsers.some(selectedUser => selectedUser.id === user.id);
  
    if (!isUserAlreadySelected) {
      this.selectedUsers.push(user.id!);
      this.getSelectedUsers.push(user);
      console.log('this.selectedUsers', this.selectedUsers);
    } else {
      console.log('User already selected!');
    }
    this.userName = '';
    this.showExistenUsers = false;
  }
  

  spliceCurrentUser(index: number){
    this.getSelectedUsers.splice(index, 1);
    this.showExistenUsers = false;
  }


  toggleAddedUserBox(){
    this.showExistenUsers = false;
  }
  

  checkIfChannelNameIsValid(channelName:string){
    const channelNameLenght = channelName.length;
    if (channelNameLenght >= 3) {
      this.channelService.btnIsValid = true;
    } else {
      this.channelService.btnIsValid = false;
    }
  }

  addNewChannel(){
    const newChannel: Channel = {
      name: this.channelName,
      description: this.channelDescription || '',
      creator: this.userService.userId,
      privatChannel: this.privatChannel,
      hashtag: this.channelName,
      addedUser: this.selectedUsers,
    }
    this.channelService.createNewChannel(newChannel);
    this.openAddNewChannelWindow();
  }


  openAddNewChannelWindow(){
    this.channelService.showAddChannelBox = !this.channelService.showAddChannelBox;
    this.channelName = '';
    this.channelDescription = '';
    this.channelService.btnIsValid = false;
    this.getSelectedUsers = [];
    this.selectedUsers = [];
    this.shwoNextWindow = false;
  }

  createChannel(){
  }
}
