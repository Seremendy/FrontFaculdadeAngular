import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Necessário para ngModel
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { LoginRequest } from '../../models/auth.models';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  // Variáveis exigidas pelo seu HTML atual:
  loginData: LoginRequest = { login: '', senha: '' };
  carregando = false;
  mensagem = '';
  sucesso = false;

  fazerLogin() {
    this.carregando = true;
    this.mensagem = '';
    this.sucesso = false;

    this.authService.login(this.loginData).subscribe({
      next: (response) => {
        this.carregando = false;
        this.sucesso = true;
        this.mensagem = 'Login realizado com sucesso!';
        
        // Redireciona imediatamente após salvar o token
        this.router.navigate(['/alunos']);
      },
      error: (err) => {
        this.carregando = false;
        this.sucesso = false;
        this.mensagem = err.error?.message || 'Erro ao tentar fazer login.';
      }
    });
  }
}