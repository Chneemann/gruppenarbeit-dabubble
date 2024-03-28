import { Component, Input } from '@angular/core';
import { ChannleService } from '../../service/channle.service';
import { MainComponent } from '../main/main.component';

@Component({
  selector: 'app-main-chat',
  standalone: true,
  imports: [MainComponent],
  templateUrl: './main-chat.component.html',
  styleUrl: './main-chat.component.scss',
})
export class MainChatComponent {
  @Input() currentChannel: string = '';

  constructor(public channelService: ChannleService) {}
}
