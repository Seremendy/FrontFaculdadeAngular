import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

// Serviços
import { NotaService, Nota } from '../../services/nota.service';
import { DisciplinaService, Disciplina } from '../../services/disciplina.service';
import { AlunoService, Aluno } from '../../services/aluno.service';

@Component({
  selector: 'app-nota-create',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="form-container">
      <h2>📊 Lançar Nota</h2>
      
      <div class="form-group">
        <label>Aluno:</label>
        <select [(ngModel)]="selectedAlunoID">
            <option [value]="0" disabled selected>-- Selecione o Aluno --</option>
            @for (aluno of alunos; track aluno.alunoID) {
                <option [value]="aluno.alunoID">{{ aluno.alunoNome }}</option>
            }
        </select>
      </div>

      <div class="form-group">
        <label>Disciplina:</label>
        <select [(ngModel)]="selectedDisciplinaID">
            <option [value]="0" disabled selected>-- Selecione a Disciplina --</option>
            @for (disc of disciplinas; track disc.disciplinaID) {
                <option [value]="disc.disciplinaID">{{ disc.nomeDisciplina }}</option>
            }
        </select>
      </div>

      <div class="form-group">
        <label>Nota (0 a 10):</label>
        <input [(ngModel)]="notaValor" type="number" step="0.5" min="0" max="10" placeholder="Ex: 8.5">
      </div>

      <div class="actions">
        <button class="btn-salvar" (click)="salvar()">Salvar Nota</button>
        <button class="btn-cancelar" (click)="cancelar()">Cancelar</button>
      </div>
    </div>
  `,
  styles: [`
    .form-container { max-width: 500px; margin: 40px auto; padding: 30px; background: white; border-radius: 8px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); font-family: sans-serif; }
    h2 { text-align: center; color: #2c3e50; margin-bottom: 25px; }
    .form-group { margin-bottom: 20px; }
    label { display: block; margin-bottom: 8px; font-weight: bold; color: #555; }
    select, input { width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 5px; background-color: white; font-size: 1rem; }
    .actions { display: flex; gap: 10px; margin-top: 20px; }
    button { flex: 1; padding: 12px; border: none; border-radius: 5px; cursor: pointer; font-weight: bold; color: white; }
    .btn-salvar { background-color: #27ae60; }
    .btn-cancelar { background-color: #95a5a6; }
  `]
})
export class NotaCreateComponent implements OnInit {
  private router = inject(Router);
  private notaService = inject(NotaService);
  private disciplinaService = inject(DisciplinaService);
  private alunoService = inject(AlunoService);

  // Listas para popular os selects
  disciplinas: Disciplina[] = [];
  alunos: Aluno[] = [];

  // Variáveis do formulário
  selectedAlunoID = 0;
  selectedDisciplinaID = 0;
  notaValor: number | null = null;

  ngOnInit() {
    this.carregarListas();
  }

  carregarListas() {
    this.alunoService.getAlunos().subscribe(d => this.alunos = d);
    this.disciplinaService.getAll().subscribe(d => this.disciplinas = d);
  }

  salvar() {
    if (this.selectedAlunoID === 0 || this.selectedDisciplinaID === 0 || this.notaValor === null) {
        alert('Preencha todos os campos!');
        return;
    }

    const novaNota: Nota = {
        alunoID: Number(this.selectedAlunoID),
        disciplinaID: Number(this.selectedDisciplinaID),
        notaValor: this.notaValor
    };

    this.notaService.create(novaNota).subscribe({
        next: () => {
            alert('Nota lançada!');
            this.router.navigate(['/notas']);
        },
        error: (e: any) => {
            console.error(e);
            alert('Erro ao salvar nota.');
        }
    });
  }

  cancelar() { this.router.navigate(['/notas']); }
}