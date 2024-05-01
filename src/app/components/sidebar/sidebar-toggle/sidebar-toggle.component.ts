import { Component, ElementRef } from '@angular/core';
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
    let viewWidth = this.elementRef.nativeElement.offsetWidth;
    if (viewWidth <= 1300 && this.chatService.isSecondaryChatOpen) {
      this.channelService.isSidebarOpen = true;
    }
    if (viewWidth <= 1300) {
      this.chatService.isSecondaryChatId = '';
      this.chatService.isSecondaryChatOpen = false;
    }
  }
}
