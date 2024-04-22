import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  Input,
  ViewChild,
} from '@angular/core';
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
import { timeInterval } from 'rxjs';
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
  @Input() index: number = 0;
  @Input() isMirrored: boolean = false;
  @Input() openOnSecondaryChat: boolean = false;

  reactionDialogId: string = '';
  reactionDialogLeft = 0;
  isEmojiPickerVisible: boolean = false;
  emojiSectionWidth: number = 0;
  dialogX: number = 0;
  dialogY: number = 0;

  openDialog(reactionId: any, event: MouseEvent) {
    this.reactionDialogId = reactionId;
    this.updateDialogPosition(event);
  }

  closeDialog() {
    this.reactionDialogId = '';
  }

  updateDialogPosition(event: MouseEvent) {
    const currentTarget = event.currentTarget as HTMLElement;
    if (currentTarget) {
      const rect = currentTarget.getBoundingClientRect();
      if (this.isMirrored) {
        this.dialogX = event.clientX - rect.left + 200;
        this.dialogY = event.clientY - rect.top - 10;
      } else {
        this.dialogX = event.clientX - 200;
        this.dialogY = event.clientY + 10;
      }
    }
  }

  constructor(
    private elementRef: ElementRef,
    private userService: UserService,
    private chatService: ChatService
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

  indexOfArray(array: any[], element: any): number {
    return array.indexOf(element);
  }

  emojiVisibleEmitter($event: any) {
    this.isEmojiPickerVisible = $event;
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

  countReactionDocId(chatId: string) {
    let count = 0;
    this.chatService.allChatReactions.forEach((reaction) => {
      if (reaction.id === chatId) {
        count++;
      }
    });
    return count;
  }

  getUserId(userId: string) {
    const filteredUser = this.userService
      .getUsers()
      .filter((user) => user.id == userId);
    return filteredUser;
  }

  toggleEmoji(reactionID: string) {
    const userIds = this.getReactionDocId(reactionID)[0].userId;
    if (userIds.includes(this.userService.userId)) {
      userIds.splice(userIds.indexOf(this.userService.userId), 1);
      if (userIds.length == 0) {
        this.chatService.deleteData(reactionID, 'reactions');
      } else {
        this.chatService.updateReaction(reactionID, userIds);
      }
    } else {
      userIds.push(this.userService.userId);
      this.chatService.updateReaction(reactionID, userIds);
    }
  }

  toggleEmojiPicker() {
    this.isEmojiPickerVisible = !this.isEmojiPickerVisible;
  }
}
