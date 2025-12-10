import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { NotaService, Nota } from '../../services/nota.service';
import { AlunoService, Aluno } from '../../services/aluno.service';
import { DisciplinaService, Disciplina } from '../../services/disciplina.service';

@Component({
  selector: 'app-nota-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="page-container">
      <header>
        <h2>📊 Diário de Notas</h2>
        <button class="btn-novo" (click)="irParaNovo()">+ Lançar Nota</button>
      </header>

      @if (loading) { <p class="loading">Carregando notas...</p> } 
      @else {
        <div class="table-container">
          <table>
            <thead>
              <tr>
                <th>Aluno</th>
                <th>Disciplina</th>
                <th>Nota</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              @for (nota of notas; track nota.notaID) {
                <tr>
                  <td>{{ getNomeAluno(nota.alunoID) }}</td>
                  <td>{{ getNomeDisciplina(nota.disciplinaID) }}</td>
                  
                  <td [style.color]="nota.notaValor < 6 ? 'red' : 'green'" style="font-weight:bold">
                    {{ nota.notaValor }}
                  </td>
                  
                  <td>
                    <button class="btn-editar" (click)="editar(nota.notaID!)">Editar</button>
                    <button class="btn-excluir" (click)="deletar(nota.notaID!)">Excluir</button>
                  </td>
                </tr>
              } @empty { <tr><td colspan="4" class="empty">Nenhuma nota lançada.</td></tr> }
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
    .btn-excluir { background: #dc3545; color: white; padding: 5px 10px; border: none; border-radius: 4px; cursor: pointer; }
    .btn-editar { background: #ffc107; padding: 5px 10px; margin-right: 5px; border: none; border-radius: 4px; cursor: pointer; }
    .loading, .empty { text-align: center; padding: 20px; color: #666; }
  `]
})
export class NotaListComponent implements OnInit {
  private router = inject(Router);
  private notaService = inject(NotaService);
  private alunoService = inject(AlunoService);
  private disciplinaService = inject(DisciplinaService);

  notas: Nota[] = [];
  alunos: Aluno[] = [];
  disciplinas: Disciplina[] = [];
  loading = true;

  ngOnInit() {
    this.carregarTudo();
  }

  carregarTudo() {
    this.loading = true;
    
    this.notaService.getAll().subscribe(notas => {
        this.notas = notas;
        
        this.alunoService.getAlunos().subscribe(alunos => {
            this.alunos = alunos;
            
            this.disciplinaService.getAll().subscribe(disc => {
                this.disciplinas = disc;
                this.loading = false;
            });
        });
    });
  }

  getNomeAluno(id: number): string {
    const encontrado = this.alunos.find(a => a.alunoID === id);
    return encontrado ? encontrado.alunoNome : 'Desconhecido';
  }

  getNomeDisciplina(id: number): string {
    const encontrado = this.disciplinas.find(d => d.disciplinaID === id);
    return encontrado ? encontrado.nomeDisciplina : 'Desconhecida';
  }

  deletar(id: number) { // Recebe ID
    if(confirm('Excluir nota?')) {
        this.notaService.delete(id).subscribe(() => this.carregarTudo());
    }
  }

  irParaNovo() {
    this.router.navigate(['/notas/novo']);
  }

  // IMPLEMENTAÇÃO DO EDITAR QUE FALTAVA
  editar(id: number) {
    this.router.navigate(['/notas/editar', id]);
  }
}