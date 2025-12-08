import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { CursoListComponent } from './pages/curso-list/curso-list.component';
import { RegisterComponent } from './pages/register/register.component'; // Importe

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'cursos', component: CursoListComponent },
  { path: 'register', component: RegisterComponent } 
];