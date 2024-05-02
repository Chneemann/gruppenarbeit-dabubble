import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { EditUserComponent } from './edit-user/edit-user.component';
import { UserService } from '../../../service/user.service';
import { SearchBarComponent } from './search-bar/search-bar.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, EditUserComponent, SearchBarComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  openMenu: boolean = false;
  showCurrentProfile: boolean = false;
  closeProfil: boolean = false;

  constructor(public userService: UserService) {}


  /**
  * Toggles the display of the side menu.
  */
  showSideMenu() {
    this.openMenu = !this.openMenu;
  }


  /**
  * Displays the current user's profile.
  */
  showProfile() {
    this.showCurrentProfile = true;
    this.closeProfil = false;
  }


  /**
   * Logs out the current user.
   */
  logout(): void {
    this.userService.currentUserLogout();
  }


  /**
   * Updates the value indicating whether the current profile is displayed.
   * @param value The new value indicating whether the current profile is displayed.
   */
  updateTestValue(value: boolean) {
    this.showCurrentProfile = value;
  }
}
