import { Component, Input } from '@angular/core';
import { SmallBtnComponent } from '../../../../shared/components/small-btn/small-btn.component';
import { CommonModule } from '@angular/common';
import {
  Chat,
  ChatAnswers,
  ChatReactions,
} from '../../../../interface/chat.interface';
import { UserService } from '../../../../service/user.service';
import { ChatService } from '../../../../service/chat.service';
import { ChannleService } from '../../../../service/channle.service';
import { EmojiPickerComponent } from '../../../../shared/components/emoji-picker/emoji-picker.component';
import { EmojiComponent } from '@ctrl/ngx-emoji-mart/ngx-emoji';
@Component({
  selector: 'app-reaction-emojis',
  standalone: true,
  imports: [
    CommonModule,
    SmallBtnComponent,
    EmojiPickerComponent,
    EmojiComponent,
  ],
  templateUrl: './reaction-emojis.component.html',
  styleUrl: './reaction-emojis.component.scss',
})
export class ReactionEmojisComponent {
  @Input() chat: Chat | ChatAnswers = {} as Chat | ChatAnswers;

  reactionDialogId: string = '';
  reactionDialogLeft = 0;
  arrayIcons: string[] = [];
  isEmojiPickerVisible: boolean = false;

  constructor(
    private userService: UserService,
    private chatService: ChatService,
    private channelService: ChannleService
  ) {}

  emojiOutputEmitter($event: any, chatId: string) {
    if (!this.checkExistEmojiOnChat(chatId, $event)) {
      let reaction: ChatReactions = {
        chatId: chatId,
        icon: $event,
        userId: [this.userService.userId],
      };
      const { id, ...reactionWithoutId } = reaction;
      this.chatService.createNewReaction(reactionWithoutId);
    }
  }

  checkExistEmojiOnChat(chatId: string, icon: string) {
    return this.getReaction(chatId).length > 0 &&
      this.getReactionIcon(chatId, icon).length > 0
      ? true
      : false;
  }

  emojiVisibleEmitter($event: any) {
    this.isEmojiPickerVisible = $event;
  }

  openDialog(reactionId: string, event: MouseEvent) {
    this.reactionDialogId = reactionId;
    this.calculateDialogPosition(event);
  }

  closeDialog() {
    this.reactionDialogId = '';
  }

  getReaction(chatId: string) {
    return this.chatService.allChatReactions.filter(
      (reaction) => reaction.chatId === chatId
    );
  }

  getReactionIcon(chatId: string, icon: string) {
    const chat = this.getReaction(chatId);
    return chat.filter((reaction) => reaction.icon == icon);
  }

  getReactionDocId(chatId: string) {
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
    let offset = 0;
    if (!this.channelService.isSidebarOpen) {
      offset = 390;
    }
    this.reactionDialogLeft = emojiRect.left + emojiRect.width - 580 + offset;
  }

  toggleEmoji(reactionID: string) {
    const userIds = this.getReactionDocId(reactionID)[0].userId;
    if (userIds.includes(this.userService.userId)) {
      userIds.splice(userIds.indexOf(this.userService.userId), 1);
    } else {
      userIds.push(this.userService.userId);
    }
    this.chatService.updateReaction(reactionID, userIds);
  }

  toggleEmojiPicker() {
    this.isEmojiPickerVisible = !this.isEmojiPickerVisible;
  }
}
