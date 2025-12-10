import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfessorService, Professor } from '../../services/professor.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-professor-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="page-container">
      <header>
        <h2>👨‍🏫 Corpo Docente</h2>
        <button class="btn-novo" (click)="irParaNovo()">+ Novo Professor</button>
      </header>

      @if (loading) { <p class="loading">Carregando professores...</p> } 
      @else {
        <div class="table-container">
          <table>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Formação</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              @for (prof of professores; track prof.professorID) {
                <tr>
                  <td><strong>{{ prof.professorNome }}</strong></td>
                  <td>{{ prof.formacao }}</td>
                  <td>
                    <button class="btn-editar" (click)="editar(prof.professorID!)">Editar</button>
                    <button class="btn-excluir" (click)="deletar(prof.professorID!)">Excluir</button>
                  </td>
                </tr>
              } @empty { <tr><td colspan="3" class="empty">Nenhum professor cadastrado.</td></tr> }
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
    
    /* CORREÇÃO 3: Estilo do botão editar */
    .btn-editar { background: #ffc107; padding: 5px 10px; margin-right: 5px; border: none; border-radius: 4px; cursor: pointer; }
    .btn-excluir { background: #dc3545; color: white; padding: 5px 10px; border: none; border-radius: 4px; cursor: pointer; }
    
    .loading, .empty { text-align: center; padding: 20px; color: #666; }
  `]
})
export class ProfessorListComponent implements OnInit {
  private router = inject(Router);
  private service = inject(ProfessorService);
  professores: Professor[] = [];
  loading = true;

  ngOnInit() { this.carregar(); }

  carregar() {
    this.service.getAll().subscribe({
      next: (d) => { this.professores = d; this.loading = false; },
      error: (e: any) => { console.error(e); this.loading = false; }
    });
  }

  deletar(id: number) {
    if(confirm('Excluir professor?')) {
        this.service.delete(id).subscribe({
            next: () => this.carregar(),
            error: (e: any) => console.error(e)
        });
    }
  }

  irParaNovo() {
    this.router.navigate(['/professores/novo']);
  }

  editar(id: number) {
    this.router.navigate(['/professores/editar', id]);
  }
}