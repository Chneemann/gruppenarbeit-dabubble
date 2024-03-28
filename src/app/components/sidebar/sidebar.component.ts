import { Component } from '@angular/core';
import { ChannleService } from '../../service/channle.service';
import { Channel } from '../../interface/channel.interface';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  allChannels: Channel[] = [];

  constructor(public channleService: ChannleService) {
    this.channleService.subChannleList().subscribe(() => {
      this.allChannels = this.loadAllChannles();
    });
  }

  loadAllChannles(): Channel[] {
    return this.channleService.allChannels;
  }
}
