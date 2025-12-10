import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink], // RouterLink permite navegar sem recarregar
  template: `
    <div class="layout-wrapper">
      <aside class="sidebar">
        <h2>Universidade</h2>
        <nav>
          <ul>
            <li><a routerLink="/cursos" routerLinkActive="ativo">🎓 Cursos</a></li>
            <li><a routerLink="/alunos" routerLinkActive="ativo">👨‍🎓 Alunos</a></li>
            <li><a routerLink="/professores" routerLinkActive="ativo">👨‍🏫 Professores</a></li>
          </ul>
        </nav>
        
        <div class="logout-area">
          <button (click)="sair()">🚪 Sair</button>
        </div>
      </aside>

      <main class="content">
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
  styles: [`
    .layout-wrapper { display: flex; height: 100vh; font-family: sans-serif; }
    
    .sidebar { width: 250px; background-color: #2c3e50; color: white; display: flex; flex-direction: column; padding: 20px; }
    .sidebar h2 { margin-bottom: 30px; text-align: center; }
    .sidebar ul { list-style: none; padding: 0; }
    .sidebar li { margin-bottom: 15px; }
    .sidebar a { color: #bdc3c7; text-decoration: none; font-size: 18px; display: block; padding: 10px; border-radius: 4px; transition: 0.3s; }
    .sidebar a:hover, .sidebar a.ativo { background-color: #34495e; color: white; }
    
    .logout-area { margin-top: auto; }
    .logout-area button { width: 100%; padding: 10px; background-color: #c0392b; color: white; border: none; cursor: pointer; border-radius: 4px; }

    .content { flex: 1; padding: 40px; background-color: #ecf0f1; overflow-y: auto; }
  `]
})
export class MainLayoutComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  sair() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}