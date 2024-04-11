import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { ChannleService } from '../../../../service/channle.service';
import { SmallBtnComponent } from '../../../../shared/components/small-btn/small-btn.component';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../../../service/user.service';
import { User } from '../../../../interface/user.interface';

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


  constructor(public channelService: ChannleService, public userService: UserService){}


  toggleShowAddChannelBox(){
    this.channelService.showAddChannelBox = !this.channelService.showAddChannelBox;
    this.channelService.shwoNextWindow = false;
  }


  createNewChannel(){
    this.channelService.shwoNextWindow = !this.channelService.shwoNextWindow;
  }


  toggleBtnTrue(){
    this.changeImg = true;
    this.channelService.channelIsPrivat = true;
  }


  toggleBtnFalse(){
    this.changeImg = false;
    this.channelService.channelIsPrivat = false;
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
    const isUserAlreadySelected = this.channelService.getSelectedUsers.some(selectedUser => selectedUser.id === user.id);
  
    if (!isUserAlreadySelected) {
      this.channelService.getSelectedUsers.push(user);
    } else {
      console.log('User already selected!');
    }
    this.userName = '';
    this.showExistenUsers = false;
  }
  

  spliceCurrentUser(index: number){
    this.channelService.getSelectedUsers.splice(index, 1);
    this.showExistenUsers = false;
  }


  toggleAddedUserBox(){
    this.showExistenUsers = false;
  }
  

  checkIsValif(channelName:string){
    const channelNameLenght = channelName.length;
    if (channelNameLenght >= 3) {
      this.channelService.btnIsValid = true;
    }
  }

  createChannel(){
  }
}
