import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service'; // <--- Importante

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
    .login-container { padding: 20px; text-align: center; max-width: 400px; margin: 50px auto; border: 1px solid #ddd; border-radius: 8px; }
    input { width: 80%; padding: 10px; margin-bottom: 10px; }
    button { padding: 10px 20px; background-color: #007bff; color: white; border: none; cursor: pointer; }
    .erro { color: red; } .sucesso { color: green; }
  `]
})
export class LoginComponent {
  private authService = inject(AuthService); // <--- Injeção do serviço
  private router = inject(Router);

  login = '';
  senha = '';
  mensagem = '';
  sucesso = false;

  fazerLogin() {
    console.log(`Tentativa de login: ${this.login} / ${this.senha}`); // Seu log atual

    const dadosLogin = { login: this.login, senha: this.senha };

    // CHAMADA REAL À API
    this.authService.login(dadosLogin).subscribe({
      next: (resposta) => {
        this.sucesso = true;
        this.mensagem = 'Login realizado com sucesso!';
        console.log('Token recebido:', resposta.token); // <--- Procure por isso
        
        localStorage.setItem('meuToken', resposta.token);
        
        // Se quiser redirecionar o admin após login:
        // this.router.navigate(['/register']); 
      },
      error: (erro) => {
        this.sucesso = false;
        console.error('Erro no login:', erro); // <--- Ou isso
        if (erro.status === 401) {
          this.mensagem = 'Login ou senha incorretos.';
        } else {
          this.mensagem = 'Erro ao conectar no servidor. (Verifique se a API está rodando)';
        }
      }
    });
  }
}