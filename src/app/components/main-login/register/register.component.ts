import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, NgForm, Validators } from '@angular/forms';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SmallBtnComponent } from "../../../shared/components/small-btn/small-btn.component";
import { HeaderComponent } from "../../../shared/components/login/header/header.component";
import { FooterComponent } from "../../../shared/components/login/footer/footer.component";
import { User } from 'firebase/auth';
import { loginService } from '../../../service/login.service';


@Component({
    selector: 'app-register',
    standalone: true,
    templateUrl: './register.component.html',
    styleUrl: './register.component.scss',
    imports: [FormsModule, CommonModule, SmallBtnComponent, HeaderComponent, FooterComponent, RouterLink]
})
export class RegisterComponent {
  firestore: Firestore = inject(Firestore);
  isChecked: boolean = false;
  email: string = '';
  password: string = '';
  name: string = '';
  currentImage: string;
  defaultImage = '/assets/img/login/box.png';
  clickedImage = '/assets/img/login/box-checked.png';
  hoverImage = '/assets/img/login/box-hover.png';
  clickedHoverImage = '/assets/img/login/box-checked-hover.png';

  constructor(private loginService: loginService) {
    this.currentImage = this.defaultImage;
  }

  register() {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, this.email, this.password)
      .then((userCredential) => {
        // erfolgreiche registrierung
        const user = userCredential.user;
        // in backend pushen
        this.createUserWithFirebase(user);
      })
      .catch((error) => {
        console.error('Registration error:', error);
      });
  }

  createUserWithFirebase(user: User) {
   
    if (!user || !user.uid) {
      console.error('User or user UID is undefined.');
      return;
    }
    const userDataToSave = {
      email: this.email,
      user:user.uid,
      name: this.name,
    };

    const usersCollection = collection(this.firestore, 'users');
    addDoc(usersCollection, userDataToSave)
      .then(() => {
        console.log('User successfully added to Firestore!');
      })
      .catch((error) => {
        console.error('Error adding user to Firestore:', error);
      });
  }

   onSubmit(ngForm: NgForm) {
    console.log('Registrierungsversuch mit:', this.email, this.password);
    this.register();
    // ngForm.resetForm();
  }

  toggleCheckbox() {
    this.isChecked = !this.isChecked;
    this.updateImage();
  }
  
  formGroup = new FormGroup({
    nameField: new FormControl('', Validators.required),
    emailField: new FormControl('', [Validators.required, Validators.email]),
    passwordField: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  onMouseOver() {
    this.updateImage(true);
  }

  onMouseOut() {
    this.updateImage();
  }

  updateImage(isHovering: boolean = false) {
    if (this.isChecked) {
      this.currentImage = isHovering ? this.clickedHoverImage : this.clickedImage;
    } else {
      this.currentImage = isHovering ? this.hoverImage : this.defaultImage;
    }
  }

}
