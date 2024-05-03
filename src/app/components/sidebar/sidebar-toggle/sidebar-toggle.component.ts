import { Component, ElementRef, Input } from '@angular/core';
import { ChannleService } from '../../../service/channle.service';
import { ChatService } from '../../../service/chat.service';
import { ToggleBooleanService } from '../../../service/toggle-boolean.service';

@Component({
  selector: 'app-sidebar-toggle',
  standalone: true,
  imports: [],
  templateUrl: './sidebar-toggle.component.html',
  styleUrl: './sidebar-toggle.component.scss',
})
export class SidebarToggleComponent {
  @Input() viewWidth: number = 0;

  constructor(
    private channelService: ChannleService,
    private chatService: ChatService,
    private toggleBoolean: ToggleBooleanService
  ) {}


  /**
   * Toggles the sidebar visibility and checks the view width.
   */
  toggleSidebar() {
    this.toggleBoolean.isSidebarOpen = !this.toggleBoolean.isSidebarOpen;
    this.checkViewWidth();
  }


  /**
   * Checks the view width and adjusts sidebar and chat states accordingly.
   */
  checkViewWidth() {
    if (this.viewWidth <= 1900 && this.chatService.isSecondaryChatOpen) {
      this.toggleBoolean.isSidebarOpen = true;
    }
    if (this.viewWidth <= 1900) {
      this.chatService.isSecondaryChatId = '';
      this.chatService.isSecondaryChatOpen = false;
    }
  }
}
