import { Component } from '@angular/core';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { UserService } from '../../service/user.service';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { MainChatComponent } from '../main-chat/main-chat.component';
import { SecondaryChatComponent } from '../secondary-chat/secondary-chat.component';
import { ChatService } from '../../service/chat.service';
import { ChannleService } from '../../service/channle.service';
import { SidebarToggleComponent } from '../sidebar/sidebar-toggle/sidebar-toggle.component';

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
    private router: ActivatedRoute
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

  isSecondaryChatOpen(): boolean {
    return this.chatService.isSecondaryChatId != '';
  }

  routeUserId() {
    if (this.router.params.subscribe()) {
      this.router.params.subscribe((params) => {
        this.currentChannel = params['id'];
      });
    }
  }
}
