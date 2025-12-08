import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="register-container">
      <h2>Registar Novo Utilizador</h2>
      
      <div class="form-group">
        <label>Login:</label>
        <input type="text" [(ngModel)]="login" placeholder="Ex: professor_joao">
      </div>

      <div class="form-group">
        <label>Senha:</label>
        <input type="password" [(ngModel)]="senha" placeholder="Mínimo 8 caracteres">
      </div>

      <div class="form-group">
        <label>Tipo de Conta:</label>
        <select [(ngModel)]="role">
          <option value="Aluno">Aluno</option>
          <option value="Professor">Professor</option>
          <option value="Admin">Administrador</option>
        </select>
      </div>

      <button (click)="fazerRegisto()" [disabled]="loading" class="btn-save">
        {{ loading ? 'A guardar...' : 'Criar Utilizador' }}
      </button>
      
      <button (click)="voltar()" class="btn-back">Voltar</button>

      <p *ngIf="mensagem" [class.erro]="!sucesso" [class.sucesso]="sucesso">
        {{ mensagem }}
      </p>
    </div>
  `,
  styles: [`
    .register-container { padding: 20px; max-width: 400px; margin: 50px auto; border: 1px solid #ddd; border-radius: 8px; font-family: Arial, sans-serif; }
    .form-group { margin-bottom: 15px; }
    label { display: block; margin-bottom: 5px; font-weight: bold; }
    input, select { width: 100%; padding: 8px; box-sizing: border-box; }
    button { width: 100%; padding: 10px; margin-top: 10px; border: none; cursor: pointer; color: white; border-radius: 4px; }
    .btn-save { background-color: #28a745; }
    .btn-save:disabled { background-color: #94d3a2; }
    .btn-back { background-color: #6c757d; }
    .erro { color: red; margin-top: 10px; }
    .sucesso { color: green; margin-top: 10px; }
  `]
})
export class RegisterComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  login = '';
  senha = '';
  role = 'Aluno'; // Valor padrão
  mensagem = '';
  sucesso = false;
  loading = false;

  fazerRegisto() {
    this.loading = true;
    this.mensagem = '';

    const dados = {
      login: this.login,
      senha: this.senha,
      role: this.role
    };

    this.authService.register(dados).subscribe({
      next: () => {
        this.sucesso = true;
        this.mensagem = 'Utilizador criado com sucesso!';
        this.loading = false;
        this.limparFormulario();
      },
      error: (e) => {
        this.sucesso = false;
        this.loading = false;
        console.error(e);
        if (e.status === 401 || e.status === 403) {
          this.mensagem = 'Erro: Apenas Administradores podem criar contas!';
        } else if (e.status === 409) {
          this.mensagem = 'Erro: Este login já existe.';
        } else {
          this.mensagem = 'Erro ao registar. Verifique os dados.';
        }
      }
    });
  }

  limparFormulario() {
    this.login = '';
    this.senha = '';
    this.role = 'Aluno';
  }

  voltar() {
    this.router.navigate(['/cursos']);
  }
}