import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserService } from './service/user.service';
import { HeaderComponent } from './shared/components/header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  constructor(public userService: UserService) {}

  icons = {
    ':smilie:': '/img',
  };

  title = 'dabubble';
}
