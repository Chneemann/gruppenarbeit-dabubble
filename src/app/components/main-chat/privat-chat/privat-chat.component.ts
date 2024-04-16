import { Component } from '@angular/core';
import { ChatContentComponent } from '../chat-content/chat-content.component';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../service/user.service';

@Component({
  selector: 'app-privat-chat',
  standalone: true,
  imports: [ChatContentComponent, CommonModule],
  templateUrl: './privat-chat.component.html',
  styleUrl: './privat-chat.component.scss'
})
export class PrivatChatComponent {

  constructor(public userService:UserService){}

  openUserProfil(){}
}
