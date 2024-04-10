import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
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

  channelName: string = '';
  channelDescription: string = '';
  shwoNextWindow: boolean = false;
  changeImg: boolean = false;
  userName: string = '';
  getSearchedUser: User[] = [];
  showExistenUsers: boolean = false;
  getSelectedUsers: User[] = [];

  constructor(public channelServide: ChannleService, public userService: UserService){}


  toggleShowAddChannelBox(){
    this.channelServide.showAddChannelBox = !this.channelServide.showAddChannelBox;
    this.shwoNextWindow = false;
  }


  createNewChannel(){
    this.shwoNextWindow = !this.shwoNextWindow;
  }


  toggleBtnTrue(){
    this.changeImg = true;
  }


  toggleBtnFalse(){
    this.changeImg = false;
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
  

  chooseUser(user: User){
    this.getSelectedUsers.push(user);
    this.showExistenUsers = false;
  }


  spliceCurrentUser(index: number){
    this.getSelectedUsers.splice(index, 1);
    this.showExistenUsers = false;
  }


  toggleAddedUserBox(){
    this.showExistenUsers = false;
  }
  

  createChannel(){
  }
}
