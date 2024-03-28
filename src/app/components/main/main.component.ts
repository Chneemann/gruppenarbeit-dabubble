import { Component } from '@angular/core';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { UserService } from '../../service/user.service';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { MainChatComponent } from '../main-chat/main-chat.component';
import { SecondaryChatComponent } from '../secondary-chat/secondary-chat.component';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [
    RouterModule,
    HeaderComponent,
    SidebarComponent,
    MainChatComponent,
    SecondaryChatComponent,
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent {
  constructor(
    public userService: UserService,
    private route: Router,
    private router: ActivatedRoute
  ) {}

  currentChannel: string = '';

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
}
