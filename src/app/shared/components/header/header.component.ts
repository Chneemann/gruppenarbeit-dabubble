import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { EditUserComponent } from './edit-user/edit-user.component';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, EditUserComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  openMenu = false;
  showCurrentProfile = false;
  isOnline = true; //---- Zeige onlineStatus an
  closeProfil = false;


  constructor() {}

  showSideMenu() {
    this.openMenu = !this.openMenu;
  }

  showProfile(){
    this.showCurrentProfile = true;
    this.closeProfil = false;
  }
  updateTestValue(value: boolean){
    this.showCurrentProfile = value;  
  }
}
