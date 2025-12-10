import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { CursoListComponent } from './pages/curso-list/curso-list.component';
import { CursoCreateComponent } from './pages/curso-create/curso-create.component';
import { CursoEditComponent } from './pages/curso-edit/curso-edit.component';
import { authGuard } from './guards/auth-guard'; // <--- Importe o Guard

export const routes: Routes = [
  // Rotas Públicas
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  // Rotas Protegidas
  { 
    path: '', 
    component: MainLayoutComponent,
    canActivate: [authGuard], // <--- AQUI ESTÁ A SEGURANÇA! Bloqueia tudo o que estiver dentro.
    children: [
      { path: 'cursos', component: CursoListComponent },
      { path: 'cursos/novo', component: CursoCreateComponent },
      { path: 'cursos/editar/:id', component: CursoEditComponent }
    ]
  },
  
  // Rota Curinga (Se digitar algo errado, vai pro login)
  { path: '**', redirectTo: 'login' }
];