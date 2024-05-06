import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { UserService } from '../../service/user.service';
import { ChannleService } from '../../service/channle.service';
import { ChatService } from '../../service/chat.service';
import { Channel } from '../../interface/channel.interface';
import { MainComponent } from '../main/main.component';
import { SingleChatComponent } from '../main-chat/single-chat/single-chat.component';
import { Chat, ChatAnswers } from '../../interface/chat.interface';
import { CommonModule } from '@angular/common';
import { User } from '../../interface/user.interface';
import { ChatMsgBoxComponent } from '../main-chat/chat-msg-box/chat-msg-box.component';

@Component({
  selector: 'app-secondary-chat',
  standalone: true,
  imports: [
    MainComponent,
    SingleChatComponent,
    ChatMsgBoxComponent,
    CommonModule,
  ],
  templateUrl: './secondary-chat.component.html',
  styleUrl: './secondary-chat.component.scss',
})
export class SecondaryChatComponent implements AfterViewChecked {
  @Input() currentChannel: string = '';
  @Input() viewWidth: number = 0;
  @ViewChild('messageBody') messageBody: ElementRef | undefined;
  sidebarLoaded: boolean = false;
  isNewMessage: boolean = false;

  constructor(
    public userService: UserService,
    public channelService: ChannleService,
    public chatService: ChatService,
    private renderer: Renderer2
  ) {}

  ngAfterViewChecked() {
    if (this.chatService.isSecondaryChatOpen && !this.sidebarLoaded) {
      this.scrollToBottom();
      this.sidebarLoaded = true;
    }
  }

  editMsgEmitter(variable: boolean) {
    this.isNewMessage = variable;
    if (this.isNewMessage) {
      this.scrollToBottom();
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

  displayCountChatAnswer(chatId: string) {
    return this.chatService.getChatAnswers(chatId).length;
  }

  closeSecondaryChat() {
    this.chatService.toggleSecondaryChat('none');
  }

  getChannels(): Channel[] {
    return this.channelService.allChannels;
  }

  getChats(): Chat[] {
    return this.chatService.allChats;
  }

  getChatAnswer(): ChatAnswers[] {
    return this.chatService.allChatAnswers;
  }

  getUsers(): User[] {
    return this.userService.allUsers;
  }

  getSingleChat(chatId: string): Chat[] {
    const filteredTasks = this.getChats().filter((chat) => chat.id == chatId);
    return filteredTasks;
  }

  getChatAnswers(chatId: string): ChatAnswers[] {
    const filteredTasks = this.getChatAnswer().filter(
      (chat) => chat.chatId === chatId
    );

    filteredTasks.sort((a, b) => b.publishedTimestamp - a.publishedTimestamp);

    return filteredTasks;
  }

  getChatUsers(chatId: string) {
    const filteredTasks = this.getUsers().filter((user) => user.id == chatId);
    return filteredTasks;
  }

  getChannelName() {
    const filteredTasks = this.getChannels().filter(
      (channel) => channel.id == this.currentChannel
    );
    return filteredTasks;
  }

  getChatChannel(chatId: string) {
    const filteredTasks = this.getChats().filter(
      (chat) => chat.channelId == chatId
    );
    return filteredTasks;
  }
}
