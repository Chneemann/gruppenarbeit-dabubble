import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EditUserComponent } from '../edit-user.component';

@Component({
  selector: 'app-edit-user-details',
  standalone: true,
  imports: [CommonModule, EditUserComponent],
  templateUrl: './edit-user-details.component.html',
  styleUrl: './edit-user-details.component.scss'
})
export class EditUserDetailsComponent {

  @Input() openEditUserValue!:boolean;
  @Input() showCurrentProfile!:boolean;

  @Output()closeEditWindow = new EventEmitter<boolean>();
  @Output()saveUserData = new EventEmitter<boolean>();


  constructor(){}


  closeEditUserWindow(){
    this.openEditUserValue = !this.openEditUserValue;
    this.closeEditWindow.emit(this.openEditUserValue);
    console.log('openEditUserValue:', this.openEditUserValue);
  }


  saveNewUserData(){
    this.showCurrentProfile = false;
    this.saveUserData.emit(this.showCurrentProfile);
    console.log('saveUserData close=false:', this.showCurrentProfile);
  }
}
