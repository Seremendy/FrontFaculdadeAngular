import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component'; // Importe o Layout
import { CursoListComponent } from './pages/curso-list/curso-list.component';
import { CursoCreateComponent } from './pages/curso-create/curso-create.component';
import { CursoEditComponent } from './pages/curso-edit/curso-edit.component';

export const routes: Routes = [
  // Rotas Públicas (Sem sidebar)
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  // Rotas Protegidas (Com Sidebar)
  { 
    path: '', 
    component: MainLayoutComponent, // O "Pai" que tem o menu
    children: [
      { path: 'cursos', component: CursoListComponent },
      { path: 'cursos/novo', component: CursoCreateComponent },
      { path: 'cursos/editar/:id', component: CursoEditComponent }
    ]
  }
];