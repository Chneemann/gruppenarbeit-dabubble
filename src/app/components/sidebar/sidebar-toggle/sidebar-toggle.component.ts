import { Component } from '@angular/core';
import { ChannleService } from '../../../service/channle.service';

@Component({
  selector: 'app-sidebar-toggle',
  standalone: true,
  imports: [],
  templateUrl: './sidebar-toggle.component.html',
  styleUrl: './sidebar-toggle.component.scss',
})
export class SidebarToggleComponent {
  constructor(private channelService: ChannleService) {}

  toggleSidebar() {
    this.channelService.isSidebarOpen = !this.channelService.isSidebarOpen;
  }
}
