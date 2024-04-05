import { Component, Input } from '@angular/core';
import { MainChatComponent } from '../main-chat.component';
import { ChatService } from '../../../service/chat.service';
import { UserService } from '../../../service/user.service';
import { SingleChatComponent } from '../single-chat/single-chat.component';
import { ChatMsgBoxComponent } from '../chat-msg-box/chat-msg-box.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chat-content',
  standalone: true,
  imports: [
    MainChatComponent,
    SingleChatComponent,
    ChatMsgBoxComponent,
    CommonModule,
  ],
  templateUrl: './chat-content.component.html',
  styleUrl: './chat-content.component.scss',
})
export class ChatContentComponent {
  @Input() currentChannel: string = '';
  @Input() getChats!: () => any;
  @Input() getUsers!: () => any;
  @Input() getChatChannel!: (currentChannel: string) => any;
  @Input() getChatUsers!: (currentChannel: string) => any;

  constructor(
    private chatService: ChatService,
    private userService: UserService
  ) {}

  convertTimestampDate(timestamp: number) {
    const currentDate = new Date();
    const inputDate = new Date(timestamp * 1000);

    const days = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];
    const months = [
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

    const dayNumber = inputDate.getDate();
    const day = days[inputDate.getDay()];
    const month = months[inputDate.getMonth()];

    if (inputDate.toDateString() === currentDate.toDateString()) {
      return `Today`;
    } else {
      return `${day}, ${dayNumber} ${month}`;
    }
  }
}
