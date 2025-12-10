import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { CursoListComponent } from './pages/curso-list/curso-list.component';
import { ProfessorListComponent } from './pages/professor-list/professor-list.component';
import { NotaListComponent } from './pages/nota-list/nota-list.component';
import { CursoCreateComponent } from './pages/curso-create/curso-create.component';
import { CursoEditComponent } from './pages/curso-edit/curso-edit.component';
import { UsuarioListComponent } from './pages/usuario-list/usuario-list.component';
import { AlunoListComponent } from './pages/aluno-list/aluno-list.component'; 
import { authGuard } from './guards/auth.guard';
import { MatriculaListComponent } from './pages/matricula-list/matricula-list.component';
import { AlunoEditComponent } from './pages/aluno-edit/aluno-edit.component';
import { AlunoCreateComponent } from './pages/aluno-create/aluno-create.component';
import { ProfessorCreateComponent } from './pages/professor-create/professor-create.component';
import { ProfessorEditComponent } from './pages/professor-edit/professor-edit.component';
import { MatriculaCreateComponent } from './pages/matricula-create/matricula-create.component';
import { NotaCreateComponent } from './pages/nota-create/nota-create.component';
import { NotaEditComponent } from './pages/nota-edit/nota-edit.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: 'usuarios', component: UsuarioListComponent },

      { path: 'alunos', component: AlunoListComponent },
      { path: 'alunos/novo', component: AlunoCreateComponent },      
      { path: 'alunos/editar/:id', component: AlunoEditComponent },

      { path: 'cursos', component: CursoListComponent },

      { path: 'professores', component: ProfessorListComponent },
      { path: 'professores/novo', component: ProfessorCreateComponent },     
      { path: 'professores/editar/:id', component: ProfessorEditComponent },

      { path: 'notas', component: NotaListComponent },
      { path: 'notas/novo', component: NotaCreateComponent },     
      { path: 'notas/editar/:id', component: NotaEditComponent },

      { path: 'matriculas', component: MatriculaListComponent },
      { path: 'matriculas/novo', component: MatriculaCreateComponent },
    ]
  },
  
  { path: '**', redirectTo: 'login' }
];