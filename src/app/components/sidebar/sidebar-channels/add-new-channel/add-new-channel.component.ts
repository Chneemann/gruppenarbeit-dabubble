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
  seachedUser = '';

  constructor(public channelServide: ChannleService, public userService: UserService){}


  toggleShowAddChannelBox(){
    this.channelServide.showAddChannelBox = !this.channelServide.showAddChannelBox;
    this.shwoNextWindow = false;
  }


  createNewChannel(){
    this.shwoNextWindow = !this.shwoNextWindow;
    console.log('channelName:', this.channelName);
    console.log('description:', this.channelDescription);
  }


  toggleBtnTrue(){
    this.changeImg = true;
  }


  toggleBtnFalse(){
    this.changeImg = false;
  }
  

  getUserFirstName(user: User): user is User & { firstName: string } {
    return user.hasOwnProperty('firstName');
  }
  

  filterUsers(user: string) {
    const searchedUser = user.toLowerCase().trim();
    const filteredUsers = this.userService.getUsers().filter((user) => {
      if (this.getUserFirstName(user)) {
        return user.firstName.toLowerCase().indexOf(searchedUser.toLowerCase()) !== -1;
      } else {
        return false;
      }
    });
    console.log('get User', filteredUsers);
  }
}
