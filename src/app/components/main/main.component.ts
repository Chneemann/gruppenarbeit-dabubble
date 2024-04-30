import { ChangeDetectorRef, Component } from '@angular/core';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { UserService } from '../../service/user.service';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { MainChatComponent } from '../main-chat/main-chat.component';
import { SecondaryChatComponent } from '../secondary-chat/secondary-chat.component';
import { ChatService } from '../../service/chat.service';
import { ChannleService } from '../../service/channle.service';
import { SidebarToggleComponent } from '../sidebar/sidebar-toggle/sidebar-toggle.component';
import { CommonModule } from '@angular/common';
import { AddNewChannelComponent } from '../sidebar/sidebar-channels/add-new-channel/add-new-channel.component';
import { OverlayComponent } from '../../shared/components/overlay/overlay.component';
import { PrivatChatComponent } from '../main-chat/privat-chat/privat-chat.component';
import { ToggleBooleanService } from '../../service/toggle-boolean.service';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [
    RouterModule,
    HeaderComponent,
    SidebarComponent,
    MainChatComponent,
    SecondaryChatComponent,
    SidebarToggleComponent,
    CommonModule,
    AddNewChannelComponent,
    OverlayComponent,
    PrivatChatComponent,
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent {
  constructor(
    public userService: UserService,
    public chatService: ChatService,
    public channelService: ChannleService,
    private route: Router,
    private router: ActivatedRoute,
    private toggleAllBooleans: ToggleBooleanService
  ) {}

  currentChannel: string = '';
  isSidebarOpen: boolean = true;

  ngOnInit() {
    this.ifUserLogin();
    this.routeUserId();
  }

  ifUserLogin() {
    if (!this.userService.isUserLogin) {
      this.route.navigateByUrl('/login');
    }
  }

  routeUserId() {
    if (this.router.params.subscribe()) {
      this.router.params.subscribe((params) => {
        this.currentChannel = params['id'];
      });
    }
  }

  toggleBooleans(){
    this.toggleAllBooleans.openSearchWindow = false;
    this.toggleAllBooleans.openSearchWindowHead = false; 
    this.toggleAllBooleans.selectUserInMsgBox = false; 
  }
}
