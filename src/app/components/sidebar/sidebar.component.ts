import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SidebarChannelsComponent } from './sidebar-channels/sidebar-channels.component';
import { SidebarDirectMessagesComponent } from './sidebar-direct-messages/sidebar-direct-messages.component';
import { SmallBtnComponent } from '../../shared/components/small-btn/small-btn.component';
import { CommonModule } from '@angular/common';
import { ChannleService } from '../../service/channle.service';
import { SearchbarComponent } from './searchbar/searchbar.component';
@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    RouterModule,
    SidebarChannelsComponent,
    SidebarDirectMessagesComponent,
    SmallBtnComponent,
    CommonModule,
    SearchbarComponent
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  openSchearchWindow: boolean = false;
  constructor(public channelService: ChannleService){}

  openSearchbar(){
    this.openSchearchWindow = !this.openSchearchWindow;
  }

  toogleSpenSchearchWindow(variable: boolean) {
    this.openSchearchWindow = variable;
  }
}
