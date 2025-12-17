import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common'; // Necessário para @if, @for
import { Router, RouterLink, RouterOutlet } from '@angular/router'; // Necessário para navegação
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [
    CommonModule, 
    RouterOutlet, 
    RouterLink
  ],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css'
})
export class MainLayoutComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  // --- Lógica para identificar o Admin ---
  get isAdmin(): boolean {
    const token = this.authService.getToken();
    if (!token) return false;

    try {
      const payloadBase64 = token.split('.')[1];
      const payloadJson = atob(payloadBase64);
      const payload = JSON.parse(payloadJson);

      const role = payload['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] || payload['role'];
      
      return role === 'Admin';
    } catch (error) {
      console.error('Erro ao ler token:', error);
      return false;
    }
  }

  // --- Lógica de Logout ---
  sair() {
    // 1. Limpa o token
    this.authService.logout();
    
    // 2. Redireciona para o login
    this.router.navigate(['/login']);
  }
}