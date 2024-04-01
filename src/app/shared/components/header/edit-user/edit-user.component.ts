import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EditUserDetailsComponent } from './edit-user-details/edit-user-details.component';
import { UserService } from '../../../../service/user.service';
import { User } from '../../../../interface/user.interface';

@Component({
  selector: 'app-edit-user',
  standalone: true,
  imports: [CommonModule, EditUserDetailsComponent],
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.scss'
})
export class EditUserComponent {
  isOnline = true; // -- wert später aus header auslesen
  openProfil = false;
  openEditUserValue = false;
  @Input() showCurrentProfile!:boolean;

  @Output()testValueChange = new EventEmitter<boolean>();

  constructor(public userService: UserService){
  }


  showSideMenu() {
    this.openEditUserValue = !this.openEditUserValue;
  }


  openEditUser(){
    this.openEditUserValue = true; 
  }


  closeCurrentProfile(){
    this.showCurrentProfile = false;
    this.testValueChange.emit(this.showCurrentProfile);
  }


  updateCloseValue(value: boolean){
    this.showCurrentProfile = value;
    this.openEditUserValue = value;
  }

}
