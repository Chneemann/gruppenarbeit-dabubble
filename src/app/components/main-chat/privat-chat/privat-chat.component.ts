import { Component } from '@angular/core';
import { ChatContentComponent } from '../chat-content/chat-content.component';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../service/user.service';
import { ChatMsgBoxComponent } from '../chat-msg-box/chat-msg-box.component';

@Component({
  selector: 'app-privat-chat',
  standalone: true,
  imports: [ChatContentComponent, CommonModule, ChatContentComponent, ChatMsgBoxComponent],
  templateUrl: './privat-chat.component.html',
  styleUrl: './privat-chat.component.scss'
})
export class PrivatChatComponent {

  constructor(public userService:UserService){}

  openUserProfil(){}
}
