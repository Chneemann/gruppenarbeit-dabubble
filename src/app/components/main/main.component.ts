import {
  AfterViewChecked,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
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
import { SharedService } from '../../service/shared.service';

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
    private elementRef: ElementRef,
    public toggleAllBooleans: ToggleBooleanService,
    private sharedService: SharedService
  ) {}

  currentChannel: string = '';
  viewWidth: number = 0;

  RESPONSIVE_THRESHOLD = this.sharedService.RESPONSIVE_THRESHOLD;
  RESPONSIVE_THRESHOLD_MAX = this.sharedService.RESPONSIVE_THRESHOLD_MAX;

  ngOnInit() {
    this.ifUserLogin();
    this.routeUserId();
    this.updateViewWidth();
  }

  ifUserLogin() {
    if (this.userService.userId == '') {
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

  @HostListener('window:resize')
  onResize() {
    this.updateViewWidth();
  }

  private updateViewWidth() {
    this.viewWidth = this.elementRef.nativeElement.offsetWidth;
    if (this.viewWidth <= this.RESPONSIVE_THRESHOLD) {
      this.toggleAllBooleans.isSidebarOpen = false;
    } else if (this.viewWidth >= this.RESPONSIVE_THRESHOLD) {
      this.toggleAllBooleans.isSidebarOpen = true;
    }
  }

  toggleBooleans() {
    this.toggleAllBooleans.openSearchWindow = false;
    this.toggleAllBooleans.openSearchWindowHead = false;
    this.toggleAllBooleans.selectUserInMsgBox = false;
  }
}
