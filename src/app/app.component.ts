import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserService } from './service/user.service';
import { UserComponent } from './shared/components/user/user.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, UserComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  icons = {
    ':smilie:': '/img',
  };

  title = 'dabubble';
}
