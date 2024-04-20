import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SingleChatComponent } from '../single-chat.component';
import { SmallBtnComponent } from '../../../../shared/components/small-btn/small-btn.component';
import { ChatService } from '../../../../service/chat.service';
import { EmojiPickerComponent } from '../../../../shared/components/emoji-picker/emoji-picker.component';
import { UserService } from '../../../../service/user.service';
import { ChatReactions } from '../../../../interface/chat.interface';

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

  constructor(
    public chatService: ChatService,
    private userService: UserService
  ) {}

  editMsg() {
    this.editMsgEmitter.emit(true);
    this.toggleNav();
  }

  emojiOutputEmitter($event: any, chatId: string) {
    if (!this.checkExistEmojiOnChat(chatId, $event)) {
      this.addNewReaction($event, chatId);
    }
  }

  addReactionIcon(icon: string, chatId: string) {
    if (!this.checkExistEmojiOnChat(chatId, icon)) {
      this.addNewReaction(icon, chatId);
    } else {
      const id = this.getReactionIcon(chatId, icon)[0].id;
      if (id != undefined) {
        this.toggleEmoji(id);
      }
    }
  }

  addNewReaction(event: any, chatId: string) {
    let reaction: ChatReactions = {
      chatId: chatId,
      icon: event,
      userId: [this.userService.userId],
    };
    const { id, ...reactionWithoutId } = reaction;
    this.chatService.createNewReaction(reactionWithoutId);
  }

  checkExistEmojiOnChat(chatId: string, icon: string) {
    return this.getReaction(chatId).length > 0 &&
      this.getReactionIcon(chatId, icon).length > 0
      ? true
      : false;
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

  emojiVisibleEmitter($event: any) {
    this.isEmojiPickerVisible = $event;
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

  getReactionDocId(chatId: string) {
    return this.chatService.allChatReactions.filter(
      (reaction) => reaction.id === chatId
    );
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
}
