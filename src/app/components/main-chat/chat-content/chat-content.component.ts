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
}
