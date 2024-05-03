import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { EditUserComponent } from './edit-user/edit-user.component';
import { UserService } from '../../../service/user.service';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { ToggleBooleanService } from '../../../service/toggle-boolean.service';
import { ChatService } from '../../../service/chat.service';
import { SharedService } from '../../../service/shared.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, EditUserComponent, SearchBarComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  @Input() viewWidth: number = 0;

  openMenu: boolean = false;
  showCurrentProfile: boolean = false;
  closeProfil: boolean = false;

  constructor(
    public userService: UserService,
    public toggleBoolean: ToggleBooleanService,
    public chatService: ChatService,
    private sharedService: SharedService
  ) {}

  RESPONSIVE_THRESHOLD = this.sharedService.RESPONSIVE_THRESHOLD;

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

  /**
   * Toggle the Sidebar.
   */
  toggleSidebar() {
    this.closeSecondaryChat();
    this.toggleBoolean.isSidebarOpen = !this.toggleBoolean.isSidebarOpen;
  }

  /**
   * Closes the secondary chat window.
   */
  closeSecondaryChat() {
    this.chatService.toggleSecondaryChat('none');
  }
}
