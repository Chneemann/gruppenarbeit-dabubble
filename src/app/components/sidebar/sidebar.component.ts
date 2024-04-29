import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { SidebarChannelsComponent } from './sidebar-channels/sidebar-channels.component';
import { SidebarDirectMessagesComponent } from './sidebar-direct-messages/sidebar-direct-messages.component';
import { SmallBtnComponent } from '../../shared/components/small-btn/small-btn.component';
import { CommonModule } from '@angular/common';
import { ChannleService } from '../../service/channle.service';
import { SearchbarComponent } from './searchbar/searchbar.component';
import { ToggleBooleanService } from '../../service/toggle-boolean.service';
@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    RouterModule,
    SidebarChannelsComponent,
    SidebarDirectMessagesComponent,
    SmallBtnComponent,
    CommonModule,
    SearchbarComponent,
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent implements OnInit {
  currentChannel: string = '';

  constructor(
    public channelService: ChannleService,
    public tootleBoolean: ToggleBooleanService,
    private router: ActivatedRoute
  ) {}

  ngOnInit() {
    this.routeUserId();
  }

  openSearchbar() {
    this.tootleBoolean.openSearchWindow = true;
  }

  routeUserId() {
    if (this.router.params.subscribe()) {
      this.router.params.subscribe((params) => {
        this.currentChannel = params['id'];
      });
    }
  }
}
