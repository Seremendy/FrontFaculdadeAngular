import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router'; // 1. Garanta que o Router está importado
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="login-container">
      <h2>Acesso Faculdade</h2>
      
      <input type="text" placeholder="Digite seu login" [(ngModel)]="login">
      <br><br>
      <input type="password" placeholder="Digite sua senha" [(ngModel)]="senha">
      <br><br>
      <button (click)="fazerLogin()">Entrar</button>

      <p *ngIf="mensagem" [class.erro]="!sucesso" [class.sucesso]="sucesso">
        {{ mensagem }}
      </p>
    </div>
  `,
  styles: [`
    /* ... seus estilos anteriores ... */
    .login-container { padding: 20px; text-align: center; max-width: 400px; margin: 50px auto; border: 1px solid #ddd; border-radius: 8px; }
    input { width: 80%; padding: 10px; margin-bottom: 10px; }
    button { padding: 10px 20px; background-color: #007bff; color: white; border: none; cursor: pointer; }
    .erro { color: red; } .sucesso { color: green; }
  `]
})
export class LoginComponent {
  private authService = inject(AuthService);
  private router = inject(Router); // 2. Injeção do Router

  login = '';
  senha = '';
  mensagem = '';
  sucesso = false;

  fazerLogin() {
    this.mensagem = 'Autenticando...';

    const dadosLogin = { login: this.login, senha: this.senha };

    this.authService.login(dadosLogin).subscribe({
      next: (resposta) => {
        this.sucesso = true;
        this.mensagem = 'Login realizado! Redirecionando...';
        
        // 3. SALVAR O TOKEN (Isso é crucial)
        localStorage.setItem('meuToken', resposta.token);
        
        // 4. NAVEGAR PARA A PÁGINA DE CURSOS
        // O Angular vai trocar a tela de Login pela de Cursos
        setTimeout(() => {
            this.router.navigate(['/cursos']);
        }, 1000); // Um pequeno delay para o usuário ver a mensagem de sucesso
      },
      error: (erro) => {
        this.sucesso = false;
        console.error(erro);
        this.mensagem = 'Erro no login. Verifique usuário e senha.';
      }
    });
  }
}