import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { authGuard } from './guards/auth.guard';

// --- Imports dos Componentes ---

// Admin
import { UsuarioListComponent } from './pages/usuario-list/usuario-list.component';

// Cursos
import { CursoListComponent } from './pages/curso-list/curso-list.component';
// Nota: Se você ainda não criou o CursoFormComponent unificado, mantenha os separados. 
// Se já criou um form único, ajuste aqui igual fizemos em Departamentos.
import { CursoCreateComponent } from './pages/curso-create/curso-create.component'; 
import { CursoEditComponent } from './pages/curso-edit/curso-edit.component';

// Alunos
import { AlunoListComponent } from './pages/aluno-list/aluno-list.component';
import { AlunoCreateComponent } from './pages/aluno-create/aluno-create.component';
import { AlunoEditComponent } from './pages/aluno-edit/aluno-edit.component';

// Professores
import { ProfessorListComponent } from './pages/professor-list/professor-list.component';
import { ProfessorCreateComponent } from './pages/professor-create/professor-create.component';
import { ProfessorEditComponent } from './pages/professor-edit/professor-edit.component';

// Departamentos (Formulário Unificado)
import { DepartamentoListComponent } from './pages/departamento-list/departamento-list.component';
import { DepartamentoFormComponent } from './pages/departamento-form/departamento-form.component';

// Matrículas
import { MatriculaListComponent } from './pages/matricula-list/matricula-list.component';
import { MatriculaCreateComponent } from './pages/matricula-create/matricula-create.component';

// Notas (Formulário Unificado)
import { NotaListComponent } from './pages/nota-list/nota-list.component';
import { NotaFormComponent } from './pages/nota-form/nota-form.component';

export const routes: Routes = [
  // 1. ROTAS PÚBLICAS (Sem Layout, Tela Cheia)
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  // 2. ROTAS PROTEGIDAS (Com Layout + Menu Lateral)
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [authGuard], // O Guard aqui protege TODOS os filhos abaixo
    children: [
      // Redirecionamento padrão (Dashboard)
      { path: '', redirectTo: 'alunos', pathMatch: 'full' }, 
      
      // --- Usuários (Admin) ---
      { path: 'usuarios', component: UsuarioListComponent },

      // --- Departamentos ---
      { path: 'departamentos', component: DepartamentoListComponent },
      { path: 'departamentos/novo', component: DepartamentoFormComponent },
      { path: 'departamentos/editar/:id', component: DepartamentoFormComponent },

      // --- Cursos ---
      { path: 'cursos', component: CursoListComponent },
      { path: 'cursos/novo', component: CursoCreateComponent },
      { path: 'cursos/editar/:id', component: CursoEditComponent },
      
      // --- Alunos ---
      { path: 'alunos', component: AlunoListComponent },
      { path: 'alunos/novo', component: AlunoCreateComponent },      
      { path: 'alunos/editar/:id', component: AlunoEditComponent },

      // --- Professores ---
      { path: 'professores', component: ProfessorListComponent },
      { path: 'professores/novo', component: ProfessorCreateComponent },     
      { path: 'professores/editar/:id', component: ProfessorEditComponent },

      // --- Matrículas ---
      { path: 'matriculas', component: MatriculaListComponent },
      { path: 'matriculas/novo', component: MatriculaCreateComponent },

      // --- Notas ---
      { path: 'notas', component: NotaListComponent },
      { path: 'notas/novo', component: NotaFormComponent },      // Usa o Form Unificado
      { path: 'notas/editar/:id', component: NotaFormComponent } // Usa o Form Unificado
    ]
  },

  // 3. ROTA CORINGA (Qualquer endereço errado vai para login)
  { path: '**', redirectTo: 'login' }
];