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
  isOnline = true; // -- wert später aus header auslesen
  openProfil = false;

  showSideMenu() {
    this.openProfil = !this.openProfil;
  }
}
