import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EditUserComponent } from '../edit-user.component';
import { UserService } from '../../../../../service/user.service';
import { FormsModule } from '@angular/forms';
import { ChannleService } from '../../../../../service/channle.service';

@Component({
  selector: 'app-edit-user-details',
  standalone: true,
  imports: [CommonModule, EditUserComponent, FormsModule],
  templateUrl: './edit-user-details.component.html',
  styleUrl: './edit-user-details.component.scss'
})
export class EditUserDetailsComponent {

  asGuestOnline: boolean = false;
  nameValue: string ='';
  emailValue: string ='';
  nameValueBoolean: boolean = false;
  emailValueBoolean: boolean = false;
  @Input() openEditUserValue!:boolean;
  @Input() showCurrentProfile!:boolean;

  @Output()closeEditWindow = new EventEmitter<boolean>();
  @Output()saveUserData = new EventEmitter<boolean>();



  constructor(public userService: UserService, public channelService: ChannleService){
    this.filterGuest();
  }


  filterGuest(){
    const getGuest = this.userService.allUsers.filter(user => user.id === 'JX5JxxPx0sdjEPHCs5F9');
    if(getGuest){
      this.asGuestOnline = true;
    } else {
      this.asGuestOnline = false;
    }
  }
  

  closeEditUserWindow(){
    this.openEditUserValue = false;
    this.closeEditWindow.emit(this.openEditUserValue);
    this.nameValue ='';
    this.emailValue ='';
  }


  saveNewUserData(){
    if (this.channelService.saveEditBtnIsValid && this.emailValueBoolean) {
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


  checkIfUserNameIsValid(nameValue: string) {
    const channelNameLenght = nameValue.length;
    if (channelNameLenght >= 3 ) {
      this.nameValueBoolean = true;
    } else {
      this.nameValueBoolean = false;
    }
    this.chackSaveBtn();
  }


  checkIfUserEmailIsValid(emailValue: string) {
    const channelNameLenght = emailValue.length;
    if (channelNameLenght >= 3) {
      this.emailValueBoolean = true;
    } else {
      this.emailValueBoolean = false;
    }
    this.chackSaveBtn();
  }


  chackSaveBtn(){
    if (this.nameValueBoolean && this.emailValueBoolean) {
      this.channelService.saveEditBtnIsValid = true;
    } else {
      this.channelService.saveEditBtnIsValid = false;
    }
  }

  

}
