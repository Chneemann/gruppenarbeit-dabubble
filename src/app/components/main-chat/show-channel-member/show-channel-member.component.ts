import { Component, Input } from '@angular/core';
import { ToggleBooleanService } from '../../../service/toggle-boolean.service';
import { CommonModule } from '@angular/common';
import { SmallBtnComponent } from '../../../shared/components/small-btn/small-btn.component';
import { User } from '../../../interface/user.interface';
import { FormsModule } from '@angular/forms';
import { ChannleService } from '../../../service/channle.service';
import { UserService } from '../../../service/user.service';

@Component({
  selector: 'app-show-channel-member',
  standalone: true,
  imports: [CommonModule, SmallBtnComponent, FormsModule],
  templateUrl: './show-channel-member.component.html',
  styleUrl: './show-channel-member.component.scss',
})
export class ShowChannelMemberComponent {
  changeImg: boolean = false;
  userName: string = '';
  showExistenUsers: boolean = false;
  getSearchedUser: User[] = [];
  channelName: string = '';
  channelDescription: string = '';
  getCurrentChannelName: string = '';
  privatChannel: boolean = false;
  getSelectedUsers: User[] = [];
  selectedUsers: string[] = [];
  testarray: string[] = [];
  channelIsPrivat: boolean = false;
  shwoNextWindow: boolean = false;

  @Input() getFiltertUsers!: User[];
  @Input() currentChannel!: string;
  constructor(
    public toggleBoolean: ToggleBooleanService,
    public channelService: ChannleService,
    public userService: UserService
  ) {}
  


  closeChannelMemberWindow() {
    this.toggleBoolean.openChannelMemberWindow = false;
    this.toggleBoolean.closeChannelMemberWindow = false;
  }


  filterUsers(userName: string) {
    this.showExistenUsers = true;
    this.getSearchedUser = [];
    const searchedUser = userName.toLowerCase().trim();
    const filteredUsers = this.userService.getUsers().filter((user) => {
      const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
      return fullName.includes(searchedUser);
    });
    this.getSearchedUser.push(...filteredUsers);
  }


  chooseUser(user: User) {
    const isUserAlreadySelected = this.getSelectedUsers.some(
      (selectedUser) => selectedUser.id === user.id
    );

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


  spliceCurrentUser(index: number) {
    this.getSelectedUsers.splice(index, 1);
    this.showExistenUsers = false;
  }


  getChannelName(currentChannel: string){
    const getName = this.channelService.allChannels.some((channel) => channel.id == currentChannel);
    const getChannelName = this.channelService.allChannels.filter((channel) => channel.id == currentChannel);
    this.getCurrentChannelName = getChannelName[0].name;
    return getName;
  }
}
