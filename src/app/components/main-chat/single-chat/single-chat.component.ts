import { Component, Input } from '@angular/core';
import { User } from '../../../interface/user.interface';
import { Chat } from '../../../interface/chat.interface';
import { ChatContentComponent } from '../chat-content/chat-content.component';

@Component({
  selector: 'app-single-chat',
  standalone: true,
  imports: [ChatContentComponent],
  templateUrl: './single-chat.component.html',
  styleUrl: './single-chat.component.scss',
})
export class SingleChatComponent {
  @Input() user!: User;
  @Input() chat!: Chat;
}
