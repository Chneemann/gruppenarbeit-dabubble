import { Component } from '@angular/core';
import { ChannleService } from '../../../service/channle.service';
import { Channel } from '../../../interface/channel.interface';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sidebar-channels',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './sidebar-channels.component.html',
  styleUrl: './sidebar-channels.component.scss',
})
export class SidebarChannelsComponent {
  constructor(public channleService: ChannleService) {}

  getChannels(): Channel[] {
    return this.channleService.allChannels;
  }
}
