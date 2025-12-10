import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

import { LoginRequest } from '../../models/login-request'; 

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="login-container">
      <h2>Acesso Universidade</h2>
      
      <input type="text" placeholder="Digite seu login" [(ngModel)]="login">
      <br><br>
      <input type="password" placeholder="Digite sua senha" [(ngModel)]="senha">
      <br><br>
      
      <button (click)="fazerLogin()" [disabled]="carregando">
        {{ carregando ? 'Entrando...' : 'Entrar' }}
      </button>

      @if (mensagem) {
        <p [class.erro]="!sucesso" [class.sucesso]="sucesso">
          {{ mensagem }}
        </p>
      }
    </div>
  `,
  styles: [`
    .login-container { padding: 40px; text-align: center; max-width: 400px; margin: 100px auto; border: 1px solid #ddd; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); font-family: sans-serif; }
    h2 { color: #333; margin-bottom: 20px; }
    input { width: 90%; padding: 12px; margin-bottom: 15px; border: 1px solid #ccc; border-radius: 4px; }
    button { padding: 12px 30px; background-color: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 16px; }
    button:disabled { background-color: #ccc; cursor: not-allowed; }
    button:hover:not(:disabled) { background-color: #0056b3; }
    .erro { color: #dc3545; margin-top: 15px; } 
    .sucesso { color: #28a745; margin-top: 15px; font-weight: bold; }
  `]
})
export class LoginComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  login = '';
  senha = '';
  mensagem = '';
  sucesso = false;
  carregando = false; // Adicionei para melhorar a UX

  fazerLogin() {
    this.carregando = true;
    this.mensagem = '';

    const dadosLogin: LoginRequest = { 
        login: this.login, 
        senha: this.senha 
    };

    this.authService.login(dadosLogin).subscribe({
      next: (resposta) => {
        this.sucesso = true;
        this.mensagem = 'Login realizado! Redirecionando...';
        setTimeout(() => {
            this.router.navigate(['/cursos']);
        }, 1500);
      },
      error: (erro) => {
        console.error(erro);
        this.sucesso = false;
        this.carregando = false;
        this.mensagem = 'Erro no login. Verifique usuário e senha.';
      }
    });
  }
}