import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CursoService, Curso } from '../../services/curso.service';

@Component({
  selector: 'app-curso-create',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container">
      <h2>Novo Curso</h2>
      
      <label>Nome:</label>
      <input [(ngModel)]="nomeCurso" type="text" placeholder="Ex: Engenharia">

      <label>Descrição:</label>
      <input [(ngModel)]="descricao" type="text" placeholder="Ex: Curso de bacharelado...">

      <label>Mensalidade (R$):</label>
      <input [(ngModel)]="mensalidade" type="number">

      <label>ID Departamento:</label>
      <input [(ngModel)]="departamentoID" type="number">

      <button (click)="salvar()">Salvar</button>
      <button (click)="cancelar()">Cancelar</button>
    </div>
  `,
  styles: [`
     .container { padding: 20px; display: flex; flex-direction: column; gap: 10px; max-width: 400px; }
     input { padding: 8px; }
     button { padding: 10px; cursor: pointer; }
  `]
})
export class CursoCreateComponent {
  private cursoService = inject(CursoService);
  private router = inject(Router);

  // Variáveis para o formulário
  nomeCurso = '';
  descricao = '';
  mensalidade = 0;
  departamentoID = 0; // Valor padrão

  salvar() {
    // Montando o objeto COMPLETO que a interface pede
    const novoCurso: Curso = {
      nomeCurso: this.nomeCurso,
      descricao: this.descricao,
      mensalidade: this.mensalidade,
      departamentoID: this.departamentoID
    };

    this.cursoService.cadastrar(novoCurso).subscribe({
      next: () => {
        alert('Curso criado!');
        this.router.navigate(['/cursos']);
      },
      error: (e: any) => {
        console.error(e);
        alert('Erro ao salvar.');
      }
    });
  }

  cancelar() {
    this.router.navigate(['/cursos']);
  }
}