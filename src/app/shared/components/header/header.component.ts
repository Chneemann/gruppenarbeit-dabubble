import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { EditUserComponent } from './edit-user/edit-user.component';
import { UserService } from '../../../service/user.service';
import { User } from '../../../interface/user.interface';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, EditUserComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  openMenu = false;
  showCurrentProfile = false;
  isOnline = true; //---- Zeige onlineStatus an
  closeProfil = false;
  currentLoggtinUser = {};
filteredUser: any;


  constructor(public userService: UserService) {}


  showSideMenu() {
    this.openMenu = !this.openMenu;
  }


  showProfile(){
    this.showCurrentProfile = true;
    this.closeProfil = false;
  }


  updateTestValue(value: boolean){
    this.showCurrentProfile = value;  
  }


  getUsers(): User[] {
    return this.userService.allUsers;
  }


  getCuurentUsers(userId: string) {
    // userId = userId.replace(/\s/g, '');
    const filteredUser = this.getUsers().filter((user) => user.id == userId);
    return filteredUser;
  }

}
