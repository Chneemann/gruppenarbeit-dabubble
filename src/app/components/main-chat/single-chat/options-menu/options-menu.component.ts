import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SingleChatComponent } from '../single-chat.component';
import { SmallBtnComponent } from '../../../../shared/components/small-btn/small-btn.component';
import { ChatService } from '../../../../service/chat.service';

@Component({
  selector: 'app-options-menu',
  standalone: true,
  imports: [CommonModule, SingleChatComponent, SmallBtnComponent],
  templateUrl: './options-menu.component.html',
  styleUrl: './options-menu.component.scss',
})
export class OptionsMenuComponent {
  @Input() index: number = 0;
  @Input() currentChat: string = '';
  @Output() editMsgEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();

  isNavOpen: boolean = false;

  constructor(public chatService: ChatService) {}

  editMsg() {
    this.editMsgEmitter.emit(true);
    this.toggleNav();
  }

  toggleNav() {
    this.isNavOpen = !this.isNavOpen;
  }

  toggleSecondaryChat(chatId: string) {
    this.chatService.toggleSecondaryChat(chatId);
  }
}
