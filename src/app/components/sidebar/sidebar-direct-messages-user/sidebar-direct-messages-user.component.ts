import { Component } from '@angular/core';
import { UserService } from '../../../service/user.service';
import { User } from '../../../interface/user.interface';

@Component({
  selector: 'app-sidebar-direct-messages-user',
  standalone: true,
  imports: [],
  templateUrl: './sidebar-direct-messages-user.component.html',
  styleUrl: './sidebar-direct-messages-user.component.scss',
})
export class SidebarDirectMessagesUserComponent {
  constructor(public userService: UserService) {}

  getUsers(): User[] {
    return this.userService.allUsers;
  }
}
