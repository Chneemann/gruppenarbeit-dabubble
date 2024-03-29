import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { loginService } from '../../../service/login.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
 
  usersData = {
    name:'',
    email: '',
    password: '',
  };

  constructor(public loginservice: loginService){

  }
  onSubmit(form: NgForm) {
    console.log('Registrierungsversuch mit:',this.usersData);
    this.loginservice.saveUser(this.usersData);
    
    form.resetForm();
  }

}
