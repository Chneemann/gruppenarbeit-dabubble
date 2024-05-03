import { Component, Input } from '@angular/core';
import { ChannleService } from '../../../service/channle.service';
import { Channel } from '../../../interface/channel.interface';
import { RouterLink } from '@angular/router';
import { ChatService } from '../../../service/chat.service';
import { SmallBtnComponent } from '../../../shared/components/small-btn/small-btn.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AddNewChannelComponent } from './add-new-channel/add-new-channel.component';
import { UserService } from '../../../service/user.service';
import { ToggleBooleanService } from '../../../service/toggle-boolean.service';

@Component({
  selector: 'app-sidebar-channels',
  standalone: true,
  imports: [
    RouterLink,
    SmallBtnComponent,
    CommonModule,
    FormsModule,
    AddNewChannelComponent,
  ],
  templateUrl: './sidebar-channels.component.html',
  styleUrl: './sidebar-channels.component.scss',
})
export class SidebarChannelsComponent {
  @Input() currentChannel: string = '';
  @Input() viewWidth: number = 0;

  minimizeChannels: boolean = true;

  constructor(
    public channelService: ChannleService,
    public chatService: ChatService,
    public userService: UserService,
    public toggleBoolean: ToggleBooleanService
  ) {}

  /**
   * Toggles the visibility of channels.
   */
  minimizeAllChannels() {
    this.minimizeChannels = !this.minimizeChannels;
  }

  /**
   * Opens the add new channel window.
   */
  openAddChannelWindow() {
    this.channelService.btnIsValid = false;
    this.channelService.showAddChannelBox = true;
  }

  /**
   * Closes the secondary chat window & sidebar.
   */
  closeSecondaryChatAndSidebar() {
    this.chatService.toggleSecondaryChat('none');
    if (this.viewWidth <= 1300) {
      this.toggleBoolean.isSidebarOpen = false;
    }
  }

  /**
   * Retrieves channels for the current user.
   * @returns Array of Channel objects.
   */
  getChannels(): Channel[] {
    const checkIfUserIsAMember = this.channelService.allChannels.some(
      (channel) => channel.addedUser.includes(this.userService.userId)
    );

    if (checkIfUserIsAMember) {
      const checkIfUserIsAMember = this.channelService.allChannels.filter(
        (channel) => channel.addedUser.includes(this.userService.userId)
      );
      return checkIfUserIsAMember;
    }
    return [];
  }
}
