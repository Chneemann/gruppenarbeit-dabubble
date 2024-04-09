import { Component } from '@angular/core';
import { UserService } from '../../../service/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar-direct-messages-user',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar-direct-messages-user.component.html',
  styleUrl: './sidebar-direct-messages-user.component.scss',
})
export class SidebarDirectMessagesUserComponent {
  constructor(public userService: UserService) {}
}
