import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router'; // Importante para o router-outlet e links
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="app-wrapper">
      <nav class="sidebar">
        <div class="logo">
          <h3>Gestão Univ.</h3>
        </div>
        
        <ul class="menu-list">
          <li><a routerLink="/cursos" routerLinkActive="active">📚 Cursos</a></li>
          <li><a style="color:gray; cursor:not-allowed">🎓 Alunos (Em breve)</a></li>
          <li><a style="color:gray; cursor:not-allowed">👨‍🏫 Professores (Em breve)</a></li>
          <li><a style="color:gray; cursor:not-allowed">📅 Turmas (Em breve)</a></li>
        </ul>

        <div class="logout-section">
          <button (click)="sair()" class="btn-logout">Sair</button>
        </div>
      </nav>

      <main class="content-area">
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
  styles: [`
    .app-wrapper { display: flex; height: 100vh; font-family: Arial, sans-serif; }
    
    /* Estilos da Sidebar */
    .sidebar { 
      width: 250px; 
      background-color: #2c3e50; 
      color: white; 
      display: flex; 
      flex-direction: column; 
      padding: 20px;
    }
    .logo h3 { margin-top: 0; border-bottom: 1px solid #34495e; padding-bottom: 20px; }
    
    .menu-list { list-style: none; padding: 0; margin-top: 20px; flex-grow: 1; }
    .menu-list li { margin-bottom: 15px; }
    .menu-list a { 
      text-decoration: none; 
      color: #ecf0f1; 
      font-size: 16px; 
      display: block; 
      padding: 10px; 
      border-radius: 4px; 
      transition: background 0.3s;
    }
    .menu-list a:hover:not([style*="not-allowed"]) { background-color: #34495e; }
    .menu-list a.active { background-color: #3498db; }

    /* Botão de Sair */
    .btn-logout { 
      width: 100%; 
      padding: 10px; 
      background-color: #e74c3c; 
      color: white; 
      border: none; 
      cursor: pointer; 
      border-radius: 4px; 
    }
    .btn-logout:hover { background-color: #c0392b; }

    /* Área de Conteúdo */
    .content-area { 
      flex-grow: 1; 
      padding: 30px; 
      background-color: #f9f9f9; 
      overflow-y: auto; 
    }
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