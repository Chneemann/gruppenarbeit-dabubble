import { Component } from '@angular/core';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [HeaderComponent, RouterModule],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss',
})
export class LandingPageComponent {
  constructor(public userService: UserService, private router: Router) {}

  ngOnInit() {
    if (!this.userService.isUserLogin) {
      this.router.navigateByUrl('/login');
    }
  }
}
