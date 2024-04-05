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
      return this.convertTimestamp(lastChatAnswer.publishedTimestamp);
    }
    return null; // oder was auch immer der Standardwert sein soll, wenn keine Antwort gefunden wurde
  }

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
    let hour = a.getHours() % 12 || 12;
    let minute = a.getMinutes().toString();
    let seconds = a.getSeconds().toString();
    let period = a.getHours() >= 12 ? 'PM' : 'AM';

    minute = parseInt(minute) < 10 ? '0' + minute : minute;
    seconds = parseInt(seconds) < 10 ? '0' + seconds : seconds;

    let time =
      month +
      ' ' +
      date +
      ', ' +
      year +
      ' - ' +
      hour +
      ':' +
      minute +
      ':' +
      seconds +
      ' ' +
      period;
    return time;
  }

  openSecondaryChat(chatId: string) {
    if (!this.chatService.isSecondaryChatId) {
      this.chatService.isSecondaryChatId = chatId;
    }
  }
}
