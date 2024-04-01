import { Component, Input } from '@angular/core';
import { User } from '../../../interface/user.interface';
import { Chat, ChatAnswers } from '../../../interface/chat.interface';
import { ChatContentComponent } from '../chat-content/chat-content.component';
import { CommonModule } from '@angular/common';
import { ChatService } from '../../../service/chat.service';

@Component({
  selector: 'app-single-chat',
  standalone: true,
  imports: [ChatContentComponent, CommonModule],
  templateUrl: './single-chat.component.html',
  styleUrl: './single-chat.component.scss',
})
export class SingleChatComponent {
  @Input() user!: User;
  @Input() chat!: Chat | ChatAnswers;
  @Input() index!: number;
  @Input() currentChat!: string;

  constructor(public chatService: ChatService) {}

  convertTimestamp(timestamp: number) {
    let a = new Date(timestamp * 1000);
    let months = [
      'Jan.',
      'Feb.',
      'Mar.',
      'Apr.',
      'May.',
      'Jun.',
      'Jul.',
      'Aug.',
      'Sep.',
      'Oct.',
      'Nov.',
      'Dec.',
    ];
    let year = a.getFullYear();
    let month = months[a.getMonth()];
    let date = a.getDate();
    let time = month + ' ' + date + ', ' + year;
    return time;
  }

  openSecondaryChat(chatId: string) {
    if (!this.chatService.isSecondaryChatId) {
      this.chatService.isSecondaryChatId = chatId;
    }
  }
}
