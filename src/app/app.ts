import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Importante para usar inputs

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule], // Importamos os módulos necessários
  template: `
    <div class="login-container">
      <h2>Acesso Faculdade</h2>
      
      <input type="text" placeholder="Digite seu login" [(ngModel)]="login">
      <br><br>

      <input type="password" placeholder="Digite sua senha" [(ngModel)]="senha">
      <br><br>

      <button (click)="fazerLogin()">Entrar</button>

      <p *ngIf="mensagem">{{ mensagem }}</p>
    </div>
  `,
  styles: [`
    .login-container {
      padding: 20px;
      font-family: Arial, sans-serif;
      text-align: center;
    }
    input {
      padding: 8px;
      border-radius: 4px;
      border: 1px solid #ccc;
    }
    button {
      padding: 8px 16px;
      background-color: #007bff;
      color: white;
      border: none;
      cursor: pointer;
    }
    button:hover {
      background-color: #0056b3;
    }
  `]
})
export class App {
  // Variáveis para armazenar os dados
  login: string = '';
  senha: string = '';
  mensagem: string = '';

  // Função chamada ao clicar no botão
  fazerLogin() {
    if (this.login === 'aluno' && this.senha === '1234') {
      this.mensagem = 'Login realizado com sucesso!';
    } else {
      this.mensagem = 'Login ou senha incorretos.';
    }
    
    // Mostra no console do navegador (F12) para testes
    console.log(`Tentativa de login: ${this.login} / ${this.senha}`);
  }
}