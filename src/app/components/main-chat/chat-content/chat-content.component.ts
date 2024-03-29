import { Component, Input } from '@angular/core';
import { MainChatComponent } from '../main-chat.component';
import { User } from '../../../interface/user.interface';
import { Chat } from '../../../interface/chat.interface';

@Component({
  selector: 'app-chat-content',
  standalone: true,
  imports: [MainChatComponent],
  templateUrl: './chat-content.component.html',
  styleUrl: './chat-content.component.scss',
})
export class ChatContentComponent {
  @Input() user!: User;
  @Input() chat!: Chat;
}
