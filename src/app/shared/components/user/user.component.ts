import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent {
  isOnline = true;
  openProfil = false;

  /**
   * Toggles the display of the side menu for user profile.
   */
  showSideMenu() {
    this.openProfil = !this.openProfil;
  }
}
