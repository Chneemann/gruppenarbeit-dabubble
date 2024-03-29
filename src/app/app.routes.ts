import { Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { MainLoginComponent } from './components/main-login/main-login.component';
import { RegisterComponent } from './components/main-login/register/register.component';
import { ChooseAvatarComponent } from './components/main-login/choose-avatar/choose-avatar.component';

export const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'login', component: MainLoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'avatar', component: ChooseAvatarComponent },
  { path: 'main', component: MainComponent },
  { path: 'main/:id', component: MainComponent },
];
