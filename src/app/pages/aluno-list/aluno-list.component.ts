import { Component, inject, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { Router } from '@angular/router'; // Import do Router
import { AlunoService, Aluno } from '../../services/aluno.service';

@Component({
  selector: 'app-aluno-list',
  standalone: true,
  imports: [CommonModule, DatePipe],
  template: `
    <div class="page-container">
      <header>
        <h2>👨‍🎓 Gerenciamento de Alunos</h2>
        <button class="btn-novo" (click)="irParaNovo()">+ Novo Aluno</button>
      </header>

      @if (loading) {
        <p class="loading">Carregando alunos...</p>
      } @else {
        <div class="table-container">
          <table>
            <thead>
              <tr>
                <th>Nome</th>
                <th>RG</th> <th>CPF</th>
                <th>Nascimento</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              @for (aluno of alunos; track aluno.alunoID) {
                <tr>
                  <td><strong>{{ aluno.alunoNome }}</strong></td> 
                  <td>{{ aluno.rg }}</td>
                  <td>{{ aluno.cpf }}</td>
                  <td>{{ aluno.dataNascimento | date:'dd/MM/yyyy' }}</td>
                  <td>
                    <button class="btn-editar" (click)="editar(aluno.alunoID!)">Editar</button>
                    <button class="btn-excluir" (click)="deletar(aluno.alunoID!)">Excluir</button>
                  </td>
                </tr>
              } @empty {
                <tr><td colspan="5" class="empty">Nenhum aluno cadastrado.</td></tr>
              }
            </tbody>
          </table>
        </div>
      }
    </div>
  `,
  styles: [`
    .page-container { padding: 30px; font-family: sans-serif; max-width: 1000px; margin: 0 auto; }
    header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
    
    table { width: 100%; border-collapse: collapse; background: white; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
    th, td { padding: 12px; text-align: left; border-bottom: 1px solid #eee; }
    th { background-color: #f8f9fa; font-weight: bold; }
    
    .btn-novo { background: #28a745; color: white; padding: 10px 20px; border: none; border-radius: 4px; cursor: pointer; }
    
    /* Botões da Tabela */
    .btn-editar { background: #ffc107; padding: 5px 10px; margin-right: 5px; border: none; border-radius: 4px; cursor: pointer; }
    .btn-excluir { background: #dc3545; color: white; padding: 5px 10px; border: none; border-radius: 4px; cursor: pointer; }
    
    .loading, .empty { text-align: center; padding: 20px; color: #666; }
  `]
})
export class AlunoListComponent implements OnInit {
  // 1. INJEÇÕES E VARIÁVEIS QUE FALTAVAM
  private alunoService = inject(AlunoService);
  private router = inject(Router); 

  alunos: Aluno[] = [];
  loading = true;

  ngOnInit() {
    this.carregar();
  }

  carregar() {
    this.loading = true;
    this.alunoService.getAlunos().subscribe({
      next: (dados) => {
        this.alunos = dados;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      }
    });
  }

  // Navegação
  irParaNovo() {
    this.router.navigate(['/alunos/novo']);
  }

  editar(id: number) {
    this.router.navigate(['/alunos/editar', id]);
  }

  deletar(id: number) {
    if(confirm('Deseja excluir este aluno?')) {
      this.alunoService.deleteAluno(id).subscribe(() => this.carregar());
    }
  }
}