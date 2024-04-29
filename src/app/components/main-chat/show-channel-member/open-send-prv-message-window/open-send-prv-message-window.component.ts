import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../../../../interface/user.interface';
import { ToggleBooleanService } from '../../../../service/toggle-boolean.service';
import { ChannleService } from '../../../../service/channle.service';
import { UserService } from '../../../../service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-open-send-prv-message-window',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './open-send-prv-message-window.component.html',
  styleUrl: './open-send-prv-message-window.component.scss',
})
export class OpenSendPrvMessageWindowComponent {
  @Input() user!: User[];
  @Input() openUserWindowBoolean!: boolean;
  @Output() closeUserWondow = new EventEmitter<boolean>();
  isOnline: boolean = false;

  constructor(
    public toggleBoolean: ToggleBooleanService,
    private channelService: ChannleService,
    public userService: UserService,
    private route: Router
  ) {}


  closeWindow() {
    this.openUserWindowBoolean = false;
    this.closeUserWondow.emit(this.openUserWindowBoolean);
  }
  

  closeEverything(){
    this.openUserWindowBoolean = false;
    this.closeUserWondow.emit(this.openUserWindowBoolean);
    this.toggleBoolean.openChannelMemberWindow = false;
    this.toggleBoolean.closeChannelMemberWindow = false;
  }


  routToUser(user: User[]) {
    const userId = user[0].id!;
    const channelExistsBoolean = this.channelService.allPrvChannels.some(
      (channel) =>
        (channel.creatorId === userId &&
          channel.talkToUserId === this.userService.userId) ||
        (channel.creatorId === this.userService.userId &&
          channel.talkToUserId === userId)
    );
    if (!channelExistsBoolean) {
      this.userService.createPrvChannel(userId);
      console.log('New private channel created');
    }
    this.getRouteToPrvChat(userId, channelExistsBoolean);
    this.closeEverything();
  }

  getRouteToPrvChat(userId: string, channelExistsBoolean: boolean) {
    if (channelExistsBoolean) {
      const existingChannel = this.channelService.allPrvChannels.find(
        (channel) =>
          (channel.creatorId === userId &&
            channel.talkToUserId === this.userService.userId) ||
          (channel.creatorId === this.userService.userId &&
            channel.talkToUserId === userId)
      );
      console.log(`/main/${existingChannel!.id}`);

      this.route.navigateByUrl(`main/${existingChannel!.id}`);
    }
  }
}
