import { Component } from '@angular/core';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { Router, RouterModule } from '@angular/router';
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
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss',
})
export class LandingPageComponent {
  constructor(public userService: UserService, private route: Router) {}

  currentChannel: string = '';

  ngOnInit() {
    this.ifUserLogin();
  }

  ifUserLogin() {
    if (!this.userService.isUserLogin) {
      this.route.navigateByUrl('/login');
    }
  }
}
