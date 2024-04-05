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
  @Input() showAnswer!: boolean;

  constructor(public chatService: ChatService) {}

  displayCountChatAnswer() {
    return this.chatService.getChatAnswers(this.chat.id).length;
  }

  displayLastChatAnswer() {
    const getChatAnswers = this.chatService.getChatAnswers(this.chat.id);
    const lastChatAnswer = getChatAnswers[getChatAnswers.length - 1];
    if (lastChatAnswer) {
      return this.convertTimestampHour(lastChatAnswer.publishedTimestamp);
    }
    return null;
  }

  convertTimestampHour(timestamp: number) {
    const date = new Date(timestamp * 1000);
    let hour = date.getHours();
    const minute = ('0' + date.getMinutes()).slice(-2);
    const period = hour >= 12 ? 'PM' : 'AM';
    hour = hour % 12 || 12;

    let hourWithNull = ('0' + hour).slice(-2);

    const formattedTime = `${hourWithNull}:${minute} ${period}`;
    return formattedTime;
  }

  openSecondaryChat(chatId: string) {
    if (!this.chatService.isSecondaryChatId) {
      this.chatService.isSecondaryChatId = chatId;
    }
  }
}
