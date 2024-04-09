import { Component } from '@angular/core';
import { ChannleService } from '../../../service/channle.service';
import { Channel } from '../../../interface/channel.interface';
import { RouterLink } from '@angular/router';
import { ChatService } from '../../../service/chat.service';
import { SmallBtnComponent } from '../../../shared/components/small-btn/small-btn.component';
import { CommonModule } from '@angular/common';
import { AddNewChannelComponent } from './add-new-channel/add-new-channel.component';

@Component({
  selector: 'app-sidebar-channels',
  standalone: true,
  imports: [RouterLink, SmallBtnComponent, CommonModule, AddNewChannelComponent],
  templateUrl: './sidebar-channels.component.html',
  styleUrl: './sidebar-channels.component.scss',
})
export class SidebarChannelsComponent {

  constructor(
    public channelService: ChannleService,
    public chatService: ChatService
  ) {}


  closeSecondaryChat() {
    this.chatService.isSecondaryChatId = '';
  }


  getChannels(): Channel[] {
    return this.channelService.allChannels;
  }

}
