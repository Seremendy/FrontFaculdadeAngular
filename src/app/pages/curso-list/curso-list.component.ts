import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CursoService } from '../../services/curso.service';
import { Curso } from '../../models/curso.model';

@Component({
  selector: 'app-curso-list',
  standalone: true,
  imports: [CommonModule], // Importante para usar o *ngFor e *ngIf
  template: `
    <div class="container">
      <h2>Listagem de Cursos</h2>

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
              <button class="btn-edit">Editar</button>
              <button class="btn-delete">Excluir</button>
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
    .btn-edit { background-color: #ffc107; border: none; padding: 5px 10px; cursor: pointer; margin-right: 5px; border-radius: 4px;}
    .btn-delete { background-color: #dc3545; color: white; border: none; padding: 5px 10px; cursor: pointer; border-radius: 4px;}
    .error-msg { color: red; background: #ffe6e6; padding: 10px; border-radius: 4px; margin-top: 20px;}
  `]
})
export class CursoListComponent implements OnInit {
  // Injeção de dependência moderna do Angular
  private cursoService = inject(CursoService);

  cursos: Curso[] = [];
  carregando = true;
  erro = '';

  ngOnInit() {
    this.carregarCursos();
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
}