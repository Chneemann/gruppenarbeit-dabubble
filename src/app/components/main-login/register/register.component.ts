import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { loginService } from '../../../service/login.service';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  firestore: Firestore = inject(Firestore);
  email: string = '';
  password: string = '';
  name: string = '';

  constructor() {
  }
  register() {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, this.email, this.password)
      .then((userCredential) => {
        // Erfolgreiche Registrierung
        const user = userCredential.user;
        // Rufen Sie createUserWithFirebase mit dem user-Objekt auf
        this.createUserWithFirebase(user);
      })
      .catch((error) => {
        console.error('Registration error:', error);
      });
  }

  createUserWithFirebase(user: any) {
    // Stellen Sie sicher, dass user und user.uid nicht undefined sind
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

  onSubmit() {
    console.log('Registrierungsversuch mit:', this.email, this.password);
    this.register();
  }
}
