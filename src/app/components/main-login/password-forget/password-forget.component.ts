import { Component,inject } from '@angular/core';
import { FooterComponent } from "../../../shared/components/login/footer/footer.component";
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../../../shared/components/login/header/header.component';
import { SmallBtnComponent } from "../../../shared/components/small-btn/small-btn.component";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { Firestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Component({
    selector: 'app-password-forget',
    standalone: true,
    templateUrl: './password-forget.component.html',
    styleUrl: './password-forget.component.scss',
    imports: [FormsModule, CommonModule, HeaderComponent, FooterComponent, RouterModule, SmallBtnComponent]
})
export class PasswordForgetComponent {
  email: string = '';
  firestore: Firestore = inject(Firestore);
  constructor(private router: Router){}

  passwordReset(){
    const auth = getAuth();
    sendPasswordResetEmail(auth, this.email)
     .then(() => {
       // Password reset email sent!
       console.log('test hier',this.email)
        // this.router.navigate(['/login']);  später zum weiter leiten 
     })
     .catch((error) => {
       const errorCode = error.code;
       const errorMessage = error.message;
       // ..
     });
  }


  onSubmit(ngForm: NgForm) {
    console.log('LogingVersuch mit:', this.email);
   this.passwordReset()
    // ngForm.resetForm();
  }
}
