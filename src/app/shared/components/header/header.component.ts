import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  openMenu = false;
  showCurrentProfile = false;
  isOnline = true; //---- Zeige onlineStatus an

  constructor() {}

  showSideMenu() {
    this.openMenu = !this.openMenu;
  }

  showProfile(){
    this.showCurrentProfile = true;
  }

}
