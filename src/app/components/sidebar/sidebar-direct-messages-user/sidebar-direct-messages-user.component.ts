import { Component } from '@angular/core';
import { UserService } from '../../../service/user.service';
import { CommonModule } from '@angular/common';
import { ChannleService } from '../../../service/channle.service';
import { User } from '../../../interface/user.interface';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sidebar-direct-messages-user',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './sidebar-direct-messages-user.component.html',
  styleUrl: './sidebar-direct-messages-user.component.scss',
})
export class SidebarDirectMessagesUserComponent {
  constructor(
    public userService: UserService,
    private channelService: ChannleService
  ) {}

  getChatUsers(userId: string) {
    const filteredTasks = this.userService
      .getUsers()
      .filter((user) => user.id == userId);
    return filteredTasks;
  }

  displayPrivateChat(userId: string) {
    const creatorChannels = this.channelService.allPrvChannels.filter(
      (user) => user.creatorId === userId
    );
    const talkToUserChannels = this.channelService.allPrvChannels.filter(
      (user) => user.talkToUserId === userId
    );
    
    return creatorChannels.concat(talkToUserChannels);
  }
}
