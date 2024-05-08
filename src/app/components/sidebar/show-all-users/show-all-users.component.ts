import { Component, EventEmitter, Output } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { UserService } from '../../../service/user.service';
import { User } from '../../../interface/user.interface';
import { ChannleService } from '../../../service/channle.service';
import { Router } from '@angular/router';
import { SmallBtnComponent } from '../../../shared/components/small-btn/small-btn.component';

@Component({
  selector: 'app-show-all-users',
  standalone: true,
  imports: [TranslateModule, SmallBtnComponent],
  templateUrl: './show-all-users.component.html',
  styleUrl: './show-all-users.component.scss',
})
export class ShowAllUsersComponent {
  @Output() toggleMemberListEmitter: EventEmitter<boolean> =
    new EventEmitter<boolean>();

  constructor(
    public userService: UserService,
    private route: Router,
    private channelService: ChannleService
  ) {}

  toggleMemberList() {
    this.toggleMemberListEmitter.emit(false);
  }

  /**
   * Checks the route based on the specified user.
   * @param user The user to check the route for.
   */
  async checkRoute(user: User[]) {
    const userId = user[0].id!;
    const channelExistsBoolean = this.channelService.allPrvChannels.some(
      (channel) =>
        (channel.creatorId === userId &&
          channel.talkToUserId === this.userService.userId) ||
        (channel.creatorId === this.userService.userId &&
          channel.talkToUserId === userId)
    );
    if (!channelExistsBoolean) {
      const id = await this.userService.createPrvChannel(userId);
      if (id) {
        this.route.navigateByUrl(`main/${id}`);
      }
    }
    this.getRouteToPrvChat(userId, channelExistsBoolean);
  }

  /**
   * Navigates to the private chat route based on the specified user.
   * @param userId The ID of the user.
   * @param channelExistsBoolean A boolean indicating whether the channel exists.
   */
  getRouteToPrvChat(userId: string, channelExistsBoolean: boolean) {
    if (channelExistsBoolean) {
      const existingChannel = this.channelService.allPrvChannels.find(
        (channel) =>
          (channel.creatorId === userId &&
            channel.talkToUserId === this.userService.userId) ||
          (channel.creatorId === this.userService.userId &&
            channel.talkToUserId === userId)
      );
      this.route.navigateByUrl(`main/${existingChannel!.id}`);
    }
  }
}
