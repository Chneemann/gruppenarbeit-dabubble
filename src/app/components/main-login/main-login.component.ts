import { Component } from '@angular/core';
import { RegisterComponent } from "./register/register.component";
import { ChooseAvatarComponent } from "./choose-avatar/choose-avatar.component";
import { LoginComponent } from "./login/login.component";

@Component({
    selector: 'app-main-login',
    standalone: true,
    templateUrl: './main-login.component.html',
    styleUrl: './main-login.component.scss',
    imports: [RegisterComponent, ChooseAvatarComponent,LoginComponent]
})
export class MainLoginComponent {
  
}
