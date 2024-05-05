import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Channel } from '../../../interface/channel.interface';
import { ChannleService } from '../../../service/channle.service';
import { UserService } from '../../../service/user.service';
import { Router } from '@angular/router';
import { User } from '../../../interface/user.interface';
import { SharedService } from '../../../service/shared.service';
import { SmallBtnComponent } from '../../../shared/components/small-btn/small-btn.component';
import { OpenSendPrvMessageWindowComponent } from '../show-channel-member/open-send-prv-message-window/open-send-prv-message-window.component';

@Component({
  selector: 'app-channel-informations',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    SmallBtnComponent,
    OpenSendPrvMessageWindowComponent,
  ],
  templateUrl: './channel-informations.component.html',
  styleUrl: './channel-informations.component.scss',
})
export class ChannelInformationsComponent {
  @Input() currentChannel: string = '';
  @Input() viewWidth: number = 0;
  @Output() closeEditEmitter: EventEmitter<boolean> =
    new EventEmitter<boolean>();

  openEditNameInput: boolean = false;
  openEditNameDescription: boolean = false;
  nameValue: string = '';
  descriptionValue: string = '';
  getCurrentChannel: Channel[] = [];
  openUserWindowBoolean: boolean = false;
  user: User[] = [];

  constructor(
    private route: Router,
    public channelService: ChannleService,
    public userService: UserService,
    private sharedService: SharedService
  ) {}

  RESPONSIVE_THRESHOLD_MOBILE = this.sharedService.RESPONSIVE_THRESHOLD_MOBILE;

  showMenu() {
    this.closeEditEmitter.emit(true);
  }

  closeMenu() {
    this.closeEditEmitter.emit(false);
    this.openEditNameDescription = false;
    this.openEditNameInput = false;
    this.descriptionValue = '';
    this.nameValue = '';
    this.getCurrentChannel = [];
  }

  preventCloseWhiteBox(event: Event) {
    event.stopPropagation();
  }

  getChannelName(chatId: string) {
    const filteredTasks = this.channelService.allChannels.filter(
      (channel) => channel.id == chatId
    );
    this.getCurrentChannel = filteredTasks;
    return filteredTasks;
  }

  getAllChannelMembers(channelId: string) {
    return this.channelService.allChannels.filter(
      (channel) => channel.id === channelId
    );
  }

  getChatUsers(userId: string) {
    return this.userService.allUsers.filter((user) => user.id === userId);
  }

  getChannelMembers(chatId: string) {
    const filteredTasks = this.userService.allUsers.filter(
      (user) => user.id == chatId
    );
    return filteredTasks;
  }

  checkCreator(currentChannel: string) {
    const getChannel = this.channelService.allChannels.filter(
      (channel) => channel.id == currentChannel
    );
    if (getChannel[0].creator === this.userService.userId) {
      return true;
    } else {
      return false;
    }
  }

  openUserWindow(user: User) {
    this.user = [user];
    this.openUserWindowBoolean = !this.openUserWindowBoolean;
  }

  changeOpenUserWindowBoolean(value: boolean) {
    this.openUserWindowBoolean = value;
  }

  editChannelName(event: Event) {
    event.stopPropagation();
    this.openEditNameInput = true;
    this.nameValue = this.getCurrentChannel[0].name;
  }

  saveEditChannelName(event: Event) {
    event.stopPropagation();
    this.openEditNameInput = false;
    this.channelService.saveAddedNameOrDescription(
      'channels',
      this.currentChannel!,
      'name',
      this.nameValue
    );
  }

  editChannelDescription(event: Event) {
    event.stopPropagation();
    this.openEditNameDescription = true;
    this.descriptionValue = this.getCurrentChannel[0].description || '';
  }

  saveEditChannelDescription(event: Event) {
    event.stopPropagation();
    this.openEditNameDescription = false;
    this.channelService.saveAddedNameOrDescription(
      'channels',
      this.currentChannel!,
      'description',
      this.descriptionValue
    );
  }

  leaveChannel(currentChannel: string, event: Event) {
    event.stopPropagation();
    const getLogedInUser: string = this.userService.userId;
    const getChannel = this.channelService.allChannels.filter(
      (channel) => channel.id == currentChannel
    );
    if (getChannel) {
      const userIndex = getChannel[0].addedUser.indexOf(getLogedInUser);

      if (userIndex) {
        getChannel[0].addedUser.splice(userIndex, 1);
        const userArray = getChannel[0].addedUser;
        this.channelService.addNewMemberToChannel(
          'channels',
          currentChannel,
          userArray,
          'leaveChannel'
        );
        this.closeEditEmitter.emit(false);
        this.route.navigateByUrl(`main/XiqUAXRY1W7PixC9kVTa`);
      } else {
        console.warn('User not found in the channel');
      }
    }
  }

  ngOnDestroy() {
    this.closeMenu();
  }
}
