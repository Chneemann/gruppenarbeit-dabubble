import { Component, Input, OnInit } from '@angular/core';
import { SmallBtnComponent } from '../../../../shared/components/small-btn/small-btn.component';
import { CommonModule } from '@angular/common';
import { Chat, ChatAnswers } from '../../../../interface/chat.interface';
import { UserService } from '../../../../service/user.service';
import { ChatService } from '../../../../service/chat.service';

@Component({
  selector: 'app-reaction-emojis',
  standalone: true,
  imports: [CommonModule, SmallBtnComponent],
  templateUrl: './reaction-emojis.component.html',
  styleUrl: './reaction-emojis.component.scss',
})
export class ReactionEmojisComponent {
  @Input() chat: Chat | ChatAnswers = {} as Chat | ChatAnswers;

  reactionDialogId: string = '';
  dialogVisible = false;
  dialogLeft = 0;
  arrayIcons: string[] = [];

  constructor(
    public userService: UserService,
    public chatService: ChatService
  ) {}

  openDialog(reactionId: string, event: MouseEvent) {
    this.reactionDialogId = reactionId;
    this.calculateDialogPosition(event);
    setTimeout(() => {
      this.dialogVisible = true;
    }, 50);
  }

  closeDialog() {
    this.reactionDialogId = '';
    this.dialogVisible = false;
  }

  getReaction(chatId: string) {
    return this.chatService.allChatReactions.filter(
      (reaction) => reaction.chatId === chatId
    );
  }

  getReactionId(chatId: string) {
    return this.chatService.allChatReactions.filter(
      (reaction) => reaction.id === chatId
    );
  }

  getUserId(userId: string) {
    const filteredUser = this.userService
      .getUsers()
      .filter((user) => user.id == userId);
    return filteredUser;
  }

  calculateDialogPosition(event: MouseEvent) {
    const emojiElement = event.target as HTMLElement;
    const emojiRect = emojiElement.getBoundingClientRect();
    this.dialogLeft = emojiRect.left + emojiRect.width - 440;
  }
}
