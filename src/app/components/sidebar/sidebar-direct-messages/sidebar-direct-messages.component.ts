import { Component, Input } from '@angular/core';
import { SidebarDirectMessagesUserComponent } from '../sidebar-direct-messages-user/sidebar-direct-messages-user.component';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { SmallBtnComponent } from '../../../shared/components/small-btn/small-btn.component';
import { ShowAllUsersComponent } from '../show-all-users/show-all-users.component';

@Component({
  selector: 'app-sidebar-direct-messages',
  standalone: true,
  imports: [
    SidebarDirectMessagesUserComponent,
    CommonModule,
    TranslateModule,
    SmallBtnComponent,
    ShowAllUsersComponent,
  ],
  templateUrl: './sidebar-direct-messages.component.html',
  styleUrl: './sidebar-direct-messages.component.scss',
})
export class SidebarDirectMessagesComponent {
  @Input() currentChannel: string = '';
  @Input() viewWidth: number = 0;

  minimizeUsers: boolean = false;
  showAllUsers: boolean = false;

  /**
   * Toggles the visibility of direct message users.
   */
  minimizeAllUsers() {
    this.minimizeUsers = !this.minimizeUsers;
  }

  toggleMemberListEmitter(variable: boolean) {
    this.showAllUsers = variable;
  }

  showAllUsersWindow() {
    this.showAllUsers = !this.showAllUsers;
  }
}
