import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SidebarChannelsComponent } from './sidebar-channels/sidebar-channels.component';
import { SidebarDirectMessagesComponent } from './sidebar-direct-messages/sidebar-direct-messages.component';
import { SmallBtnComponent } from '../../shared/components/small-btn/small-btn.component';
import { SidebarToggleComponent } from './sidebar-toggle/sidebar-toggle.component';
@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    RouterModule,
    SidebarChannelsComponent,
    SidebarDirectMessagesComponent,
    SmallBtnComponent,
    SidebarToggleComponent,
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {}
