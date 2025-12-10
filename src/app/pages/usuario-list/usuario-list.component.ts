import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-usuario-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="page-container">
      <header>
        <h2>👥 Gestão de Usuários</h2>
        <button class="btn-novo" (click)="irParaNovo()">+ Novo Usuário</button>
      </header>

      @if (loading) {
        <div class="loading-state">
            <p>Carregando usuários...</p>
        </div>
      } @else {
        
        <div class="table-container">
            <table>
            <thead>
                <tr>
                <th>ID</th>
                <th>Login</th>
                <th>Permissão (Role)</th>
                <th>Ações</th>
                </tr>
            </thead>
            <tbody>
                @for (user of usuarios; track user.usuarioID) {
                <tr>
                    <td>#{{ user.usuarioID }}</td>
                    <td><strong>{{ user.login }}</strong></td>
                    <td>
                        <span [class]="'badge ' + user.role">{{ user.role }}</span>
                    </td>
                    <td>
                    <button class="btn-excluir" (click)="deletar(user.usuarioID)">Remover</button>
                    </td>
                </tr>
                } @empty {
                <tr>
                    <td colspan="4" class="empty-msg">Nenhum usuário encontrado.</td>
                </tr>
                }
            </tbody>
            </table>
        </div>
      }
    </div>
  `,
  styles: [`
    .page-container { padding: 30px; font-family: 'Segoe UI', sans-serif; max-width: 1000px; margin: 0 auto; }
    header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 25px; }
    h2 { color: #2c3e50; font-size: 1.8rem; }
    
    .table-container { background: white; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); overflow: hidden; }
    table { width: 100%; border-collapse: collapse; }
    th { background-color: #f8f9fa; color: #6c757d; font-weight: 600; text-transform: uppercase; font-size: 0.85rem; padding: 15px; text-align: left; }
    td { padding: 15px; border-bottom: 1px solid #eee; color: #444; }
    tr:last-child td { border-bottom: none; }
    tr:hover { background-color: #fcfcfc; }

    .btn-novo { background-color: #2ecc71; color: white; border: none; padding: 10px 20px; border-radius: 6px; cursor: pointer; font-weight: 600; transition: 0.2s; }
    .btn-novo:hover { background-color: #27ae60; }
    
    .btn-excluir { background-color: #fff0f0; color: #e74c3c; border: 1px solid #fadbd8; padding: 6px 12px; border-radius: 4px; cursor: pointer; font-size: 0.9rem; transition: 0.2s; }
    .btn-excluir:hover { background-color: #e74c3c; color: white; }

    /* Badges */
    .badge { padding: 5px 10px; border-radius: 20px; font-size: 0.75rem; font-weight: bold; text-transform: uppercase; letter-spacing: 0.5px; }
    .badge.Admin { background-color: #e8f6fd; color: #3498db; }
    .badge.Professor { background-color: #fff8e1; color: #f1c40f; }
    .badge.Aluno { background-color: #e8f8f5; color: #2ecc71; }

    .loading-state, .empty-msg { text-align: center; padding: 40px; color: #95a5a6; }
  `]
})
export class UsuarioListComponent implements OnInit {
  private authService = inject(AuthService);
  private router = inject(Router);

  usuarios: any[] = [];
  loading = true;

  ngOnInit() {
    this.carregarUsuarios();
  }

  carregarUsuarios() {
    this.loading = true;
    this.authService.getUsers().subscribe({
      next: (dados) => {
        this.usuarios = dados;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
        alert('Erro ao carregar usuários (Você é Admin?).');
      }
    });
  }

  irParaNovo() {
    this.router.navigate(['/register']); // Vai para a tela de cadastro que já criamos
  }

  deletar(id: number) {
    if (confirm('Tem certeza que deseja remover este usuário? Essa ação não pode ser desfeita.')) {
      this.authService.deleteUser(id).subscribe({
        next: () => {
          alert('Usuário removido com sucesso!');
          this.carregarUsuarios(); // Atualiza a tabela na hora
        },
        error: (err) => {
          console.error(err);
          alert('Erro ao excluir usuário.');
        }
      });
    }
  }
}