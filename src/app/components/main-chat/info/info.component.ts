import { Component, Input } from '@angular/core';
import { ChannleService } from '../../../service/channle.service';
import { UserService } from '../../../service/user.service';

@Component({
  selector: 'app-info',
  standalone: true,
  imports: [],
  templateUrl: './info.component.html',
  styleUrl: './info.component.scss',
})
export class InfoComponent {
  @Input() currentChannel: string = '';

  constructor(
    private channelService: ChannleService,
    private userService: UserService
  ) {}

  getChatUsers(chatId: string) {
    const filteredTasks = this.userService.allUsers.filter(
      (user) => user.id == chatId
    );
    return filteredTasks;
  }

  getChannelName(chatId: string) {
    const filteredTasks = this.channelService.allChannels.filter(
      (channel) => channel.id == chatId
    );
    return filteredTasks;
  }

  timeConverter(dateString: string) {
    var a = new Date(dateString);
    var months = [
      'Jan.',
      'Feb.',
      'Mar.',
      'Apr.',
      'May.',
      'Jun.',
      'Jul.',
      'Aug.',
      'Sep.',
      'Oct.',
      'Nov.',
      'Dec.',
    ];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var time = month + ' ' + date + ', ' + year;
    return time;
  }
}
