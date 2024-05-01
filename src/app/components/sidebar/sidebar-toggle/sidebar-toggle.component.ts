import { Component, ElementRef, Input } from '@angular/core';
import { ChannleService } from '../../../service/channle.service';
import { ChatService } from '../../../service/chat.service';

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
    private elementRef: ElementRef
  ) {}

  toggleSidebar() {
    this.channelService.isSidebarOpen = !this.channelService.isSidebarOpen;
    this.checkViewWidth();
  }

  checkViewWidth() {
    if (this.viewWidth <= 1900 && this.chatService.isSecondaryChatOpen) {
      this.channelService.isSidebarOpen = true;
    }
    if (this.viewWidth <= 1900) {
      this.chatService.isSecondaryChatId = '';
      this.chatService.isSecondaryChatOpen = false;
    }
  }
}
