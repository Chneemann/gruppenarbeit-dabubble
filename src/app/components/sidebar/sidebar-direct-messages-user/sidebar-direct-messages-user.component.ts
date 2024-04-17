import { Component } from '@angular/core';
import { UserService } from '../../../service/user.service';
import { CommonModule } from '@angular/common';
import { ChannleService } from '../../../service/channle.service';
import { User } from '../../../interface/user.interface';

@Component({
  selector: 'app-sidebar-direct-messages-user',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar-direct-messages-user.component.html',
  styleUrl: './sidebar-direct-messages-user.component.scss',
})
export class SidebarDirectMessagesUserComponent {
  constructor(public userService: UserService, private channelService: ChannleService) {}

  openPrvChat(user: User){
    this.channelService.openPrvChat = true;
    user.id! = this.userService.getPrvChetUserId;
  }
}
