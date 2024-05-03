import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
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
  @Input() viewWidth: number = 0;

  currentChannel: string = '';

  constructor(
    public channelService: ChannleService,
    public tootleBoolean: ToggleBooleanService,
    private router: ActivatedRoute
  ) {}

  /**
   * Lifecycle hook called after component initialization.
   * It invokes the method to handle route parameters.
   */
  ngOnInit() {
    this.routeUserId();
  }

  /**
   * Opens the search bar by toggling a boolean value.
   */
  openSearchbar() {
    this.tootleBoolean.openSearchWindow = true;
  }

  /**
   * Retrieves the user ID from the route parameters.
   */
  routeUserId() {
    if (this.router.params.subscribe()) {
      this.router.params.subscribe((params) => {
        this.currentChannel = params['id'];
      });
    }
  }
}
