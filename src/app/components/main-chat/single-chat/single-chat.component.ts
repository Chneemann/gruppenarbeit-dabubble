import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../../../interface/user.interface';
import { Chat, ChatAnswers } from '../../../interface/chat.interface';
import { ChatContentComponent } from '../chat-content/chat-content.component';
import { CommonModule, NgSwitchCase } from '@angular/common';
import { ChatService } from '../../../service/chat.service';
import { DownloadFilesService } from '../../../service/download-files.service';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { OptionsMenuComponent } from './options-menu/options-menu.component';
import { AttachmentsComponent } from './attachments/attachments.component';

@Component({
  selector: 'app-single-chat',
  standalone: true,
  imports: [
    ChatContentComponent,
    CommonModule,
    NgSwitchCase,
    NgxExtendedPdfViewerModule,
    OptionsMenuComponent,
    AttachmentsComponent,
  ],
  templateUrl: './single-chat.component.html',
  styleUrl: './single-chat.component.scss',
})
export class SingleChatComponent {
  @Input() user!: User;
  @Input() chat!: Chat | ChatAnswers;
  @Input() index: number = 0;
  @Input() currentChat!: string;
  @Input() showAnswer!: boolean;
  @Input() showOptionsMenu: boolean = false;

  trustedUrl: string = '';
  isOptionMenuVisible: boolean = false;
  isMsgInEdit: boolean = false;

  constructor(
    public chatService: ChatService,
    public channelService: ChatService,
    public downloadFilesService: DownloadFilesService
  ) {}

  editMsg(variable: boolean) {
    this.isMsgInEdit = variable;
  }

  toggleOptionMenu() {
    this.isOptionMenuVisible = !this.isOptionMenuVisible;
  }

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

  openSecondaryChat(chatId: string, event: MouseEvent) {
    const target = event.target as HTMLElement;
    const isOptionsMenuClicked = target.closest('app-options-menu') !== null;
    const isFilesClicked = target.closest('.files') !== null;
    const isInputClicked = target.closest('input') !== null;

    if (!isOptionsMenuClicked && !isFilesClicked && !isInputClicked) {
      this.chatService.isSecondaryChatId = chatId;
    }
  }
}
