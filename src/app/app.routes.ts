import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';

export const routes: Routes = [
  // Esta linha diz: se o caminho for vazio, vá para 'login'
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  
  // Esta linha diz: quando o caminho for 'login', mostre o LoginComponent
  { path: 'login', component: LoginComponent }
];