import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

// Serviços
import { MatriculaService, Matricula } from '../../services/matricula.service';
import { AlunoService, Aluno } from '../../services/aluno.service';
import { CursoService, Curso } from '../../services/curso.service';

@Component({
  selector: 'app-matricula-create',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="form-container">
      <h2>📝 Nova Matrícula</h2>
      
      <div class="form-group">
        <label>Selecione o Aluno:</label>
        <select [(ngModel)]="selectedAlunoID">
            <option [value]="0" disabled selected>-- Escolha um Aluno --</option>
            @for (aluno of alunos; track aluno.alunoID) {
                <option [value]="aluno.alunoID">{{ aluno.alunoNome }}</option>
            }
        </select>
      </div>

      <div class="form-group">
        <label>Selecione o Curso:</label>
        <select [(ngModel)]="selectedCursoID">
            <option [value]="0" disabled selected>-- Escolha um Curso --</option>
            @for (curso of cursos; track curso.cursoID) {
                <option [value]="curso.cursoID">{{ curso.nomeCurso }}</option>
            }
        </select>
      </div>

      <div class="form-group">
        <label>Data da Matrícula:</label>
        <input [(ngModel)]="dataMatricula" type="date">
      </div>

      <div class="actions">
        <button class="btn-salvar" (click)="salvar()">Matricular</button>
        <button class="btn-cancelar" (click)="cancelar()">Cancelar</button>
      </div>
    </div>
  `,
  styles: [`
    .form-container { max-width: 500px; margin: 40px auto; padding: 30px; background: white; border-radius: 8px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); font-family: sans-serif; }
    h2 { text-align: center; color: #2c3e50; margin-bottom: 25px; }
    .form-group { margin-bottom: 20px; }
    label { display: block; margin-bottom: 8px; font-weight: bold; color: #555; }
    /* Estilo do Select e Input */
    select, input { width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 5px; background-color: white; font-size: 1rem; }
    select:focus, input:focus { outline: none; border-color: #3498db; }
    
    .actions { display: flex; gap: 10px; margin-top: 20px; }
    button { flex: 1; padding: 12px; border: none; border-radius: 5px; cursor: pointer; font-weight: bold; color: white; }
    .btn-salvar { background-color: #27ae60; }
    .btn-cancelar { background-color: #95a5a6; }
  `]
})
export class MatriculaCreateComponent implements OnInit {
  // Injeções
  private matriculaService = inject(MatriculaService);
  private alunoService = inject(AlunoService);
  private cursoService = inject(CursoService);
  private router = inject(Router);

  // Dados para os Dropdowns
  alunos: Aluno[] = [];
  cursos: Curso[] = [];

  // Dados do Formulário
  selectedAlunoID = 0;
  selectedCursoID = 0;
  dataMatricula = new Date().toISOString().split('T')[0]; // Data de hoje

  ngOnInit() {
    this.carregarListas();
  }

  carregarListas() {
    // Busca Alunos
    this.alunoService.getAlunos().subscribe({
        next: (dados) => this.alunos = dados,
        error: (e: any) => console.error('Erro alunos:', e)
    });

    // Busca Cursos
    // OBS: Verifique se seu serviço usa 'listar()' ou 'getAll()'. 
    // Baseado no último ajuste, usamos 'listar()'.
    this.cursoService.listar().subscribe({
        next: (dados) => this.cursos = dados,
        error: (e: any) => console.error('Erro cursos:', e)
    });
  }

  salvar() {
    if (this.selectedAlunoID === 0 || this.selectedCursoID === 0) {
        alert('Selecione Aluno e Curso!');
        return;
    }

    const novaMatricula: Matricula = {
        alunoID: Number(this.selectedAlunoID),
        cursoID: Number(this.selectedCursoID),
        dataMatricula: this.dataMatricula
    };

    this.matriculaService.create(novaMatricula).subscribe({
        next: () => {
            alert('Matrícula realizada!');
            this.router.navigate(['/matriculas']);
        },
        error: (e: any) => {
            console.error(e);
            alert('Erro ao salvar matrícula.');
        }
    });
  }

  cancelar() {
    this.router.navigate(['/matriculas']);
  }
}