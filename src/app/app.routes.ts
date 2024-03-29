import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { MainComponent } from './components/main/main.component';
import { RegisterComponent } from './components/login/register/register.component';
import { ChooseAvatarComponent } from './components/login/choose-avatar/choose-avatar.component';

export const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'avatar', component: ChooseAvatarComponent },
  { path: 'main', component: MainComponent },
  { path: 'main/:id', component: MainComponent },
];
