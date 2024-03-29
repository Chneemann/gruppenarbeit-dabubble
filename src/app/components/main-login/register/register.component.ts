import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { loginService } from '../../../service/login.service';
import { User } from '../../../interface/user.interface';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
 
   usersData : User = {
     firstName: '',
     email: '',
     password: '',
     lastName: '',
     avatar: ''
   };

  constructor(public loginservice: loginService){

  }
  onSubmit(form: NgForm) {
    console.log('Registrierungsversuch mit:',this.usersData);
    this.loginservice.addNewUser(this.usersData);
    
    form.resetForm();
  }

}
