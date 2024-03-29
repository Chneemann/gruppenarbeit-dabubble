import { Component, Input } from '@angular/core';
import { User } from '../../../interface/user.interface';
import { Chat } from '../../../interface/chat.interface';
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
  @Input() chat!: Chat;
  @Input() index!: number;
  @Input() currentChat!: string;

  constructor(public chatService: ChatService) {}

  convertTimestamp(timestamp: number) {
    var a = new Date(timestamp * 1000);
    var months = [
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
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var time = month + ' ' + date + ', ' + year;
    return time;
  }

  openSecondaryChat(chatId: string) {
    console.log(chatId);
    this.chatService.isSecondaryChatOpen =
      !this.chatService.isSecondaryChatOpen;
  }
}
