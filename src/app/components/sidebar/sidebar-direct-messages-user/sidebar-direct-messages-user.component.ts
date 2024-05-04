import { Component, Input } from '@angular/core';
import { UserService } from '../../../service/user.service';
import { CommonModule } from '@angular/common';
import { ChannleService } from '../../../service/channle.service';
import { User } from '../../../interface/user.interface';
import { RouterLink } from '@angular/router';
import { ChatService } from '../../../service/chat.service';
import { ToggleBooleanService } from '../../../service/toggle-boolean.service';
import { SharedService } from '../../../service/shared.service';

@Component({
  selector: 'app-sidebar-direct-messages-user',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './sidebar-direct-messages-user.component.html',
  styleUrl: './sidebar-direct-messages-user.component.scss',
})
export class SidebarDirectMessagesUserComponent {
  @Input() currentChannel: string = '';
  @Input() viewWidth: number = 0;

  constructor(
    public userService: UserService,
    private channelService: ChannleService,
    public chatService: ChatService,
    public toggleBoolean: ToggleBooleanService,
    private sharedService: SharedService
  ) {}

  RESPONSIVE_THRESHOLD = this.sharedService.RESPONSIVE_THRESHOLD;

  /**
   * Get users for private chat.
   * @param userId The ID of the user.
   * @returns Array of User objects.
   */
  getChatUsers(userId: string) {
    const filteredTasks = this.userService
      .getUsers()
      .filter((user) => user.id == userId);
    return filteredTasks;
  }

  /**
   * Closes the secondary chat window & sidebar.
   */
  closeSecondaryChatAndSidebar() {
    this.chatService.toggleSecondaryChat('none');
    if (this.viewWidth <= this.RESPONSIVE_THRESHOLD) {
      this.toggleBoolean.isSidebarOpen = false;
    }
  }

  /**
   * Display private chat channels.
   * @param userId The ID of the user.
   * @returns Array of private chat channels.
   */
  displayPrivateChat(userId: string) {
    const creatorChannels = this.channelService.allPrvChannels.filter(
      (user) => user.creatorId === userId
    );
    const talkToUserChannels = this.channelService.allPrvChannels.filter(
      (user) => user.talkToUserId === userId
    );

    return Array.from(new Set(creatorChannels.concat(talkToUserChannels)));
  }
}
