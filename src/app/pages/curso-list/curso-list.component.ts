import { Component, inject, OnInit } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { CursoService } from '../../services/curso.service';
import { Curso } from '../../models/curso.model';

@Component({
  selector: 'app-curso-list',
  standalone: true,
  imports: [CommonModule, NgIf, NgFor],
  template: `
    <div class="container">
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <h2>Listagem de Cursos</h2>
        <button (click)="irParaNovo()" class="btn-novo">+ Novo Curso</button>
      </div>

      <div *ngIf="carregando" class="loading">
        Carregando dados...
      </div>

      <table *ngIf="!carregando && !erro">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome do Curso</th>
            <th>ID Depto</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let curso of cursos">
            <td>{{ curso.cursoID }}</td>
            <td>{{ curso.nomeCurso }}</td>
            <td>{{ curso.departamentoID }}</td>
            <td>
              <button class="btn-edit" (click)="editarCurso(curso.cursoID)">Editar</button>
              <button class="btn-delete" (click)="deletarCurso(curso.cursoID)">Excluir</button>
            </td>
          </tr>
        </tbody>
      </table>

      <p *ngIf="!carregando && cursos.length === 0 && !erro">
        Nenhum curso cadastrado no sistema.
      </p>

      <div *ngIf="erro" class="error-msg">
        {{ erro }}
      </div>
    </div>
  `,
  styles: [`
    .container { padding: 20px; font-family: Arial, sans-serif; }
    table { width: 100%; border-collapse: collapse; margin-top: 15px; }
    th, td { padding: 10px; border-bottom: 1px solid #ddd; text-align: left; }
    th { background-color: #f4f4f4; }
    
    .btn-novo { background-color: #28a745; color: white; padding: 10px 15px; border: none; border-radius: 4px; cursor: pointer; font-size: 14px; }
    .btn-novo:hover { background-color: #218838; }

    .btn-edit { background-color: #ffc107; border: none; padding: 5px 10px; cursor: pointer; margin-right: 5px; border-radius: 4px;}
    .btn-delete { background-color: #dc3545; color: white; border: none; padding: 5px 10px; cursor: pointer; border-radius: 4px;}
    .btn-delete:hover { background-color: #c82333; }
    
    .error-msg { color: red; background: #ffe6e6; padding: 10px; border-radius: 4px; margin-top: 20px;}
    .loading { color: #666; font-style: italic; margin-top: 10px; }
  `]
})
export class CursoListComponent implements OnInit {
  private cursoService = inject(CursoService);
  private router = inject(Router);

  cursos: Curso[] = [];
  carregando = true;
  erro = '';

  ngOnInit() {
    this.carregarCursos();
  }

  irParaNovo() {
    this.router.navigate(['/cursos/novo']);
  }

  carregarCursos() {
    this.cursoService.listar().subscribe({
      next: (dados) => {
        this.cursos = dados;
        this.carregando = false;
        console.log('Dados recebidos do C#:', dados);
      },
      error: (e) => {
        this.carregando = false;
        console.error('Erro ao buscar cursos:', e);
        if (e.status === 401) {
          this.erro = 'Você não tem permissão. Faça login novamente.';
        } else {
          this.erro = 'Erro ao conectar com o servidor.';
        }
      }
    });
  }

  // --- MÉTODO DE EXCLUSÃO ADICIONADO ---
  deletarCurso(id: number) {
    if (confirm('Tem certeza que deseja excluir este curso?')) {
      this.cursoService.excluir(id).subscribe({
        next: () => {
          // Remove o curso da lista visualmente
          this.cursos = this.cursos.filter(c => c.cursoID !== id);
          alert('Curso excluído com sucesso!');
        },
        error: (erro) => {
          console.error(erro);
          // O backend provavelmente impedirá apagar cursos com dependências
          alert('Erro ao excluir. Verifique se não há alunos ou turmas vinculados a este curso.');
        }
      });
    }
  }

  editarCurso(id: number) {
  this.router.navigate(['/cursos/editar', id]);
  }
}