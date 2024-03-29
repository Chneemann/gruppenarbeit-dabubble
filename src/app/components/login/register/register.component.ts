import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

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

  constructor(){

  }
  onSubmit(form: NgForm) {
    console.log('Registrierungsversuch mit:',this.usersData);
    form.resetForm();
  }
}
