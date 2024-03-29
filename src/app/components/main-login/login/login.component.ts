import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  
  usersData = {
    name:'',
    email: '',
    password: '',
  };

  constructor(){

  }
  onSubmit(form: NgForm) {
    console.log('Registrierungsversuch mit:',this.usersData);
    form.resetForm();
  }
}
