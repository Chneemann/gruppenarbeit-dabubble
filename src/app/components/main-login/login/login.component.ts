import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-main-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class MainLoginComponent {
  
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
