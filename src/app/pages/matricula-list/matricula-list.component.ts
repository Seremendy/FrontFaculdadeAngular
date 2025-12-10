import { Component, inject, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { MatriculaService, Matricula } from '../../services/matricula.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-matricula-list',
  standalone: true,
  imports: [CommonModule, DatePipe],
  template: `
    <div class="page-container">
      <header>
        <h2>📝 Matrículas Realizadas</h2>
        <button class="btn-novo" (click)="irParaNovo()">+ Nova Matrícula</button>
      </header>

      @if (loading) {
        <p class="loading">Carregando matrículas...</p>
      } @else {
        <div class="table-container">
          <table>
            <thead>
              <tr>
                <th>ID Matrícula</th>
                <th>ID Aluno</th>
                <th>ID Curso</th>
                <th>Data Matrícula</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              @for (mat of matriculas; track mat.matriculaID) {
                <tr>
                  <td>#{{ mat.matriculaID }}</td>
                  <td>{{ mat.alunoID }}</td>
                  <td>{{ mat.cursoID }}</td>
                  <td>{{ mat.dataMatricula | date:'dd/MM/yyyy' }}</td>
                  <td>
                    <button class="btn-excluir" (click)="deletar(mat.matriculaID!)">Cancelar</button>
                  </td>
                </tr>
              } @empty {
                <tr><td colspan="5" class="empty">Nenhuma matrícula encontrada.</td></tr>
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
    .btn-excluir { background: #dc3545; color: white; padding: 5px 10px; border: none; border-radius: 4px; cursor: pointer; }
    .loading, .empty { text-align: center; padding: 20px; color: #666; }
  `]
})
export class MatriculaListComponent implements OnInit {
  private router = inject(Router);
  private service = inject(MatriculaService);
  matriculas: Matricula[] = [];
  loading = true;

  ngOnInit() {
    this.carregar();
  }

  carregar() {
    this.service.getAll().subscribe({
      next: (dados) => {
        this.matriculas = dados;
        this.loading = false;
      },
      error: (err: any) => { // Adicionei a tipagem :any
        console.error(err);
        this.loading = false;
      }
    });
  }

  deletar(id: number) {
    if(confirm('Deseja cancelar esta matrícula?')) {
      this.service.delete(id).subscribe({
        next: () => this.carregar(),
        error: (err: any) => console.error(err) // Adicionei a tipagem :any
      });
    }
  }

  irParaNovo() {
    this.router.navigate(['/matriculas/novo']);
  }
}