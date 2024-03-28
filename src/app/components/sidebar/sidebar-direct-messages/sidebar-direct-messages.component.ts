import { Component } from '@angular/core';
import { SidebarDirectMessagesUserComponent } from '../sidebar-direct-messages-user/sidebar-direct-messages-user.component';

@Component({
  selector: 'app-sidebar-direct-messages',
  standalone: true,
  imports: [SidebarDirectMessagesUserComponent],
  templateUrl: './sidebar-direct-messages.component.html',
  styleUrl: './sidebar-direct-messages.component.scss',
})
export class SidebarDirectMessagesComponent {}
