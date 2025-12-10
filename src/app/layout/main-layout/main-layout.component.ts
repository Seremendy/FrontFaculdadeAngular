import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <div class="layout-wrapper">
      
      <aside class="sidebar">
        <div class="logo-area">
          <h2>🎓 UniSystem</h2>
          <span class="subtitle">Gestão Acadêmica</span>
        </div>

        <nav class="menu">
          <ul>
            <li>
              <a routerLink="/cursos" routerLinkActive="active">
                <span class="icon">📚</span> Cursos
              </a>
            </li>

            <li>
              <a routerLink="/alunos" routerLinkActive="active">
                <span class="icon">👨‍🎓</span> Alunos
              </a>
            </li>

            <li>
              <a routerLink="/professores" routerLinkActive="active">
                <span class="icon">👨‍🏫</span> Professores
              </a>
            </li>

            <li>
              <a routerLink="/matriculas" routerLinkActive="active">
                <span class="icon">📝</span> Matrículas
              </a>
            </li>

             <li>
              <a routerLink="/notas" routerLinkActive="active">
                <span class="icon">📊</span> Notas
              </a>
            </li>

            @if (isAdmin) {
              <li class="admin-section">
                <span class="section-title">ADMINISTRAÇÃO</span>
              </li>
              <li>
                <a routerLink="/usuarios" routerLinkActive="active">
                  <span class="icon">🔐</span> Usuários
                </a>
              </li>
            }
          </ul>
        </nav>

        <div class="user-profile">
          <div class="user-info">
            <p class="user-name">Olá, Usuário</p>
            <small class="user-role">{{ isAdmin ? 'Administrador' : 'Colaborador' }}</small>
          </div>
          <button (click)="sair()" class="btn-logout" title="Sair">
            🚪
          </button>
        </div>
      </aside>


      <main class="content-area">
        <router-outlet></router-outlet>
      </main>

    </div>
  `,
  styles: [`
    
    * { box-sizing: border-box; margin: 0; padding: 0; }

    
    .layout-wrapper {
      display: flex;
      height: 100vh; 
      width: 100vw;
      font-family: 'Segoe UI', sans-serif;
      overflow: hidden; 
    }

    
    .sidebar {
      width: 260px;
      background-color: #1e293b; 
      color: #f1f5f9;
      display: flex;
      flex-direction: column;
      box-shadow: 2px 0 10px rgba(0,0,0,0.1);
      flex-shrink: 0; 

    .logo-area {
      padding: 30px 20px;
      text-align: center;
      border-bottom: 1px solid #334155;
    }
    .logo-area h2 { font-size: 1.5rem; color: #38bdf8; letter-spacing: 1px; }
    .subtitle { font-size: 0.8rem; color: #94a3b8; text-transform: uppercase; }

    
    .menu { flex: 1; padding: 20px 10px; overflow-y: auto; }
    .menu ul { list-style: none; }
    .menu li { margin-bottom: 8px; }

    .menu a {
      display: flex;
      align-items: center;
      padding: 12px 15px;
      color: #cbd5e1;
      text-decoration: none;
      border-radius: 8px;
      transition: all 0.3s;
      font-size: 0.95rem;
    }

    .menu a:hover {
      background-color: #334155;
      color: white;
      transform: translateX(5px);
    }

    
    .menu a.active {
      background-color: #0ea5e9; 
      color: white;
      font-weight: 600;
      box-shadow: 0 4px 12px rgba(14, 165, 233, 0.3);
    }

    .icon { margin-right: 12px; font-size: 1.1rem; }

    
    .admin-section { margin-top: 20px; padding-left: 15px; margin-bottom: 10px; }
    .section-title { font-size: 0.7rem; color: #64748b; font-weight: bold; letter-spacing: 1px; }


    .user-profile {
      padding: 20px;
      background-color: #0f172a;
      border-top: 1px solid #334155;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .user-info p { font-size: 0.9rem; font-weight: bold; }
    .user-info small { color: #94a3b8; font-size: 0.75rem; }

    .btn-logout {
      background: none;
      border: none;
      font-size: 1.2rem;
      cursor: pointer;
      padding: 8px;
      border-radius: 50%;
      transition: background 0.3s;
    }
    .btn-logout:hover { background-color: #ef4444; } /* Vermelho ao passar o mouse */

    .content-area {
      flex: 1; 
      background-color: #f8fafc; 
      padding: 0;
      overflow-y: auto; 
    }
  `]
})
export class MainLayoutComponent implements OnInit {
  private authService = inject(AuthService);
  private router = inject(Router);

  isAdmin = false;

  ngOnInit() {
    
    this.checkRole();
  }

  checkRole() {
    const token = this.authService.getToken();
    if (token) {
        this.isAdmin = true; 
    }
  }

  sair() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}