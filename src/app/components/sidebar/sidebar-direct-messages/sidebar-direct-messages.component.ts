import { Component, Input } from '@angular/core';
import { SidebarDirectMessagesUserComponent } from '../sidebar-direct-messages-user/sidebar-direct-messages-user.component';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-sidebar-direct-messages',
  standalone: true,
  imports: [SidebarDirectMessagesUserComponent, CommonModule, TranslateModule],
  templateUrl: './sidebar-direct-messages.component.html',
  styleUrl: './sidebar-direct-messages.component.scss',
})
export class SidebarDirectMessagesComponent {
  @Input() currentChannel: string = '';
  @Input() viewWidth: number = 0;

  minimizeUsers: boolean = false;

  /**
   * Toggles the visibility of direct message users.
   */
  minimizeAllUsers() {
    this.minimizeUsers = !this.minimizeUsers;
  }
}
