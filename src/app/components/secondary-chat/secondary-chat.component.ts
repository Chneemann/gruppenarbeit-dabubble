import { Component, Input } from '@angular/core';
import { UserService } from '../../service/user.service';
import { ChannleService } from '../../service/channle.service';
import { ChatService } from '../../service/chat.service';
import { Channel } from '../../interface/channel.interface';
import { MainComponent } from '../main/main.component';

@Component({
  selector: 'app-secondary-chat',
  standalone: true,
  imports: [MainComponent],
  templateUrl: './secondary-chat.component.html',
  styleUrl: './secondary-chat.component.scss',
})
export class SecondaryChatComponent {
  @Input() currentChannel: string = '';

  constructor(
    public userService: UserService,
    public channelService: ChannleService,
    public chatService: ChatService
  ) {}

  closeSecondaryChat() {
    this.chatService.isSecondaryChatOpen = '';
  }

  getChannels(): Channel[] {
    return this.channelService.allChannels;
  }

  getChannelName() {
    this.currentChannel = this.currentChannel.replace(/\s/g, '');
    const filteredTasks = this.getChannels().filter(
      (channel) => channel.id == this.currentChannel
    );
    return filteredTasks;
  }
}
