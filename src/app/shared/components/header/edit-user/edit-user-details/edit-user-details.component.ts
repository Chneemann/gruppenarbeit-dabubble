import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EditUserComponent } from '../edit-user.component';
import { User } from '../../../../../interface/user.interface';
import { UserService } from '../../../../../service/user.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-user-details',
  standalone: true,
  imports: [CommonModule, EditUserComponent, FormsModule],
  templateUrl: './edit-user-details.component.html',
  styleUrl: './edit-user-details.component.scss'
})
export class EditUserDetailsComponent {

  nameValue: string ='';
  emailValue: string ='';
  @Input() openEditUserValue!:boolean;
  @Input() showCurrentProfile!:boolean;

  @Output()closeEditWindow = new EventEmitter<boolean>();
  @Output()saveUserData = new EventEmitter<boolean>();


  constructor(public userService: UserService){}


  closeEditUserWindow(){
    this.openEditUserValue = false;
    this.closeEditWindow.emit(this.openEditUserValue);
    this.nameValue ='';
    this.emailValue ='';
  }


  saveNewUserData(){
    const fullname: string[] = this.nameValue.split(" ");
    const newFirstName:string = fullname[0];
    let newLastName:string = fullname[1];
    if (fullname[2]) {
      newLastName += ' ' + fullname[2];
    }

    this.userService.updateUserData(newFirstName, newLastName, this.emailValue);
    this.nameValue ='';
    this.emailValue ='';
    this.showCurrentProfile = false;
    this.saveUserData.emit(this.showCurrentProfile);
  }

}
