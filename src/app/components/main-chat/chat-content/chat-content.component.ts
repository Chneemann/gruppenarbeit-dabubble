import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { MainChatComponent } from '../main-chat.component';
import { ChatService } from '../../../service/chat.service';
import { UserService } from '../../../service/user.service';
import { SingleChatComponent } from '../single-chat/single-chat.component';
import { ChatMsgBoxComponent } from '../chat-msg-box/chat-msg-box.component';
import { CommonModule } from '@angular/common';
import { DownloadFilesService } from '../../../service/download-files.service';
import { OptionsMenuComponent } from '../single-chat/options-menu/options-menu.component';
import { ChannleService } from '../../../service/channle.service';

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
export class ChatContentComponent implements AfterViewInit, AfterViewChecked {
  @Input() currentChannel: string = '';
  @Input() isPrivatChannel: boolean = false;
  @Input() hideContentWindow: boolean = false;
  @Input() mainChatSectionWidth: number = 0;
  @Input() getChats!: () => any;
  @Input() getUsers!: () => any;
  @Input() getChatChannel!: (currentChannel: string) => any;
  @Input() getChatUsers!: (currentChannel: string) => any;
  @ViewChild('messageBody') messageBody: ElementRef | undefined;
  filesLoaded: boolean = false;

  constructor(
    private chatService: ChatService,
    private userService: UserService,
    public channelService: ChannleService,
    private downloadFilesService: DownloadFilesService,
    private renderer: Renderer2
  ) {}

  ngAfterViewInit() {
    this.scrollToBottom();
    this.downloadFilesService.downloadedFiles.subscribe((files) => {
      if (files.length > 0) {
        this.filesLoaded = true;
      }
    });
  }

  ngAfterViewChecked() {
    if (this.filesLoaded) {
      this.scrollToBottom();
      this.filesLoaded = false;
    }
  }

  scrollToBottom(): void {
    if (this.messageBody) {
      const element = this.messageBody.nativeElement;
      this.renderer.setProperty(
        element,
        'scrollTop',
        element.scrollHeight - element.clientHeight
      );
    }
  }

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
