import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { loginService } from '../../../service/login.service';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  firestore: Firestore = inject(Firestore);
  isChecked: boolean = false;
  email: string = '';
  password: string = '';
  name: string = '';

  constructor() {
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

  createUserWithFirebase(user: any) {
    //  user und user.uid nicht undefined sonst fehler
    if (!user || !user.uid) {
      console.error('User or user UID is undefined.');
      return;
    }
    const userDataToSave = {
      email: this.email,
      password: this.password,
      // user:this.user.uid
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
    ngForm.resetForm();
  }
}
