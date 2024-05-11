import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EditUserComponent } from '../edit-user.component';
import { UserService } from '../../../../../service/user.service';
import { FormsModule, NgForm } from '@angular/forms';
import { ChannleService } from '../../../../../service/channle.service';
import { TranslateModule } from '@ngx-translate/core';
import { SmallBtnComponent } from '../../../small-btn/small-btn.component';


@Component({
  selector: 'app-edit-user-details',
  standalone: true,
  imports: [
    CommonModule,
    EditUserComponent,
    FormsModule,
    TranslateModule,
    SmallBtnComponent,
  ],
  templateUrl: './edit-user-details.component.html',
  styleUrl: './edit-user-details.component.scss',
})
export class EditUserDetailsComponent {
  asGuestOnline: boolean = false;
  nameValueBoolean: boolean = false;
  emailValueBoolean: boolean = false;
  changedName: string = '';
  changedEmail: string = '';
  @Input() openEditUserValue!: boolean;
  @Input() showCurrentProfile!: boolean;

  @Output() closeEditWindow = new EventEmitter<boolean>();
  @Output() saveUserData = new EventEmitter<boolean>();

  constructor(
    public userService: UserService,
    public channelService: ChannleService
  ) {}


  /** Filters whether the user is a guest. */
  filterGuest() {
    const getGuest = this.userService.allUsers.filter(
      (user) => user.id === this.userService.getCurrentUserId()
    );
    if ('JX5JxxPx0sdjEPHCs5F9' === getGuest[0].id) {
      this.asGuestOnline = true;
      return false;
    } else {
      this.asGuestOnline = false;
      return true;
    }
  }

  /** Closes the edit user window. */
  closeEditUserWindow() {
    this.openEditUserValue = false;
    this.closeEditWindow.emit(this.openEditUserValue);
  }

  /** Saves the new user data. */
  saveNewUserData(ngForm: NgForm) {
    if (ngForm.submitted && ngForm.form.valid) {
      if (
        this.channelService.saveEditBtnIsValid &&
        this.emailValueBoolean 
      ) {
        const fullname: string[] = this.changedName.split(' ');
        const newFirstName: string = fullname[0];
        let newLastName: string = fullname[1];
        if (fullname[2]) {
          newLastName += ' ' + fullname[2];
        }

        this.userService.updateUserData(
          newFirstName,
          newLastName,
          this.changedEmail
        );
        this.showCurrentProfile = false;
        this.channelService.saveEditBtnIsValid = false;
        this.saveUserData.emit(this.showCurrentProfile);
      }
    }
  }

  /**
   * Checks if the user name is valid.
   * @param nameValue The value of the user's name.
   */
  checkIfUserNameIsValid(nameValue: string) {
    if (nameValue.trim() === '') {
      this.nameValueBoolean = false;
    } else {
      const channelNameLenght = nameValue.length;
      if (channelNameLenght >= 3) {
        this.nameValueBoolean = true;
        this.changedName = nameValue;
      } else {
        this.nameValueBoolean = false;
      }
    }
    this.chackSaveBtn();
  }
  
  /**
   * Checks if the user email is valid.
   * @param emailValue The value of the user's email.
   */
  checkIfUserEmailIsValid(emailValue: string) {
    if (emailValue.trim() === '') {
      this.emailValueBoolean = false;
    } else {
      const emailRegex = /^[\w.%+-]+@[\w.-]+\.[a-zA-Z]{2,}$/;
      if (emailRegex.test(emailValue)) {
        this.emailValueBoolean = true;
        this.changedEmail = emailValue;
      } else {
        this.emailValueBoolean = false;
      }
    }
    this.chackSaveBtn();
  }

  /**
   * Checks if the save button is valid.
   */
  chackSaveBtn() {
    if (this.nameValueBoolean && this.emailValueBoolean) {
      this.channelService.saveEditBtnIsValid = true;
    } else {
      this.channelService.saveEditBtnIsValid = false;
    }
  }
}
