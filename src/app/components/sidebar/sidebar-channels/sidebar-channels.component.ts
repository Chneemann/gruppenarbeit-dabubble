import { Component } from '@angular/core';
import { ChannleService } from '../../../service/channle.service';
import { Channel } from '../../../interface/channel.interface';
import { RouterLink } from '@angular/router';
import { ChatService } from '../../../service/chat.service';

@Component({
  selector: 'app-sidebar-channels',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './sidebar-channels.component.html',
  styleUrl: './sidebar-channels.component.scss',
})
export class SidebarChannelsComponent {
  constructor(
    public channelService: ChannleService,
    public chatService: ChatService
  ) {}

  getChannels(): Channel[] {
    this.chatService.isSecondaryChatId = '';

    return this.channelService.allChannels;
  }
}
