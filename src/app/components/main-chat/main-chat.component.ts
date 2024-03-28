import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChannleService } from '../../service/channle.service';

@Component({
  selector: 'app-main-chat',
  standalone: true,
  imports: [],
  templateUrl: './main-chat.component.html',
  styleUrl: './main-chat.component.scss',
})
export class MainChatComponent {
  currentChannel: string = '';

  constructor(
    private router: ActivatedRoute,
    public channelService: ChannleService
  ) {}
  ngOnInit() {
    this.routeUserId();
  }

  routeUserId() {
    if (this.router.params.subscribe()) {
      this.router.params.subscribe((params) => {
        this.currentChannel = params['id'];
      });
    }
  }
}
