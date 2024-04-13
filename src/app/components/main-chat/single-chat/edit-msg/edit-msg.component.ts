import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Chat, ChatAnswers } from '../../../../interface/chat.interface';
import { SingleChatComponent } from '../single-chat.component';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { ChatService } from '../../../../service/chat.service';
import { PickerComponent } from '@ctrl/ngx-emoji-mart';
import { SmallBtnComponent } from '../../../../shared/components/small-btn/small-btn.component';

@Component({
  selector: 'app-edit-msg',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    SingleChatComponent,
    PickerComponent,
    SmallBtnComponent,
  ],
  templateUrl: './edit-msg.component.html',
  styleUrl: './edit-msg.component.scss',
})
export class EditMsgComponent {
  @Input() chat!: Chat | ChatAnswers;
  @Output() closeEditMsgEmitter: EventEmitter<boolean> =
    new EventEmitter<boolean>();

  public isEmojiPickerVisible: boolean | undefined;
  showEmojis: boolean = false;
  public originalMessage: string = '';

  constructor(public chatService: ChatService) {}

  ngOnInit() {
    this.originalMessage = this.chat.message;
  }

  closeEditMsg() {
    this.chat.message = this.originalMessage;
    this.closeEditMsgEmitter.emit(false);
  }

  onSubmit(chatId: string, form: NgForm) {
    this.chatService.updateChat(chatId, form.value);
    this.closeEditMsg();
  }

  public addEmoji(event: any) {
    this.chat.message = `${this.chat.message}${event.emoji.native}`;
    this.isEmojiPickerVisible = false;
  }

  toggleShowEmojis() {
    this.showEmojis = !this.showEmojis;
    this.isEmojiPickerVisible = true;
  }
}
