import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SingleChatComponent } from '../single-chat.component';
import { SmallBtnComponent } from '../../../../shared/components/small-btn/small-btn.component';
import { ChatService } from '../../../../service/chat.service';
import { EmojiPickerComponent } from '../../../../shared/components/emoji-picker/emoji-picker.component';

@Component({
  selector: 'app-options-menu',
  standalone: true,
  imports: [
    CommonModule,
    SingleChatComponent,
    SmallBtnComponent,
    EmojiPickerComponent,
  ],
  templateUrl: './options-menu.component.html',
  styleUrl: './options-menu.component.scss',
})
export class OptionsMenuComponent {
  @Input() index: number = 0;
  @Input() currentChat: string = '';
  @Output() editMsgEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();

  isNavOpen: boolean = false;
  isEmojiPickerVisible: boolean = false;

  constructor(public chatService: ChatService) {}

  editMsg() {
    this.editMsgEmitter.emit(true);
    this.toggleNav();
  }

  emojiOutputEmitter($event: any) {
    console.log($event);
  }

  toggleNav() {
    this.isNavOpen = !this.isNavOpen;
    this.isEmojiPickerVisible = false;
  }

  toggleSecondaryChat(chatId: string) {
    this.chatService.toggleSecondaryChat(chatId);
    this.isEmojiPickerVisible = false;
  }

  toggleEmojiPicker() {
    this.isEmojiPickerVisible = !this.isEmojiPickerVisible;
  }
}
