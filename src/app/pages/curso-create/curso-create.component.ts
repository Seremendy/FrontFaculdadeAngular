import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CursoService } from '../../services/curso.service';

@Component({
  selector: 'app-curso-create',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container">
      <h2>Novo Curso</h2>

      <div class="form-group">
        <label>Nome do Curso:</label>
        <input type="text" [(ngModel)]="nomeCurso" placeholder="Ex: Engenharia Civil">
      </div>

      <div class="form-group">
        <label>ID do Departamento:</label>
        <input type="number" [(ngModel)]="departamentoID" placeholder="Ex: 1">
        <small style="color: #666; display: block; margin-top: 5px;">(Consulte os IDs na lista de departamentos)</small>
      </div>

      <button (click)="salvar()" [disabled]="loading" class="btn-save">
        {{ loading ? 'Salvando...' : 'Salvar Curso' }}
      </button>
      
      <button (click)="cancelar()" class="btn-cancel">Cancelar</button>

      <p *ngIf="mensagem" [class.erro]="!sucesso" [class.sucesso]="sucesso">
        {{ mensagem }}
      </p>
    </div>
  `,
  styles: [`
    .container { padding: 20px; max-width: 500px; font-family: Arial, sans-serif; }
    .form-group { margin-bottom: 15px; }
    label { display: block; margin-bottom: 5px; font-weight: bold; }
    input { width: 100%; padding: 8px; box-sizing: border-box; }
    button { padding: 10px 15px; margin-right: 10px; border: none; cursor: pointer; border-radius: 4px; color: white; }
    .btn-save { background-color: #28a745; }
    .btn-save:hover { background-color: #218838; }
    .btn-cancel { background-color: #6c757d; }
    .btn-cancel:hover { background-color: #5a6268; }
    .erro { color: red; margin-top: 10px; }
    .sucesso { color: green; margin-top: 10px; }
  `]
})
export class CursoCreateComponent {
  private cursoService = inject(CursoService);
  private router = inject(Router);

  nomeCurso = '';
  departamentoID: number | null = null;
  
  loading = false;
  mensagem = '';
  sucesso = false;

  salvar() {
    // Validação simples
    if (!this.nomeCurso || !this.departamentoID) {
      this.mensagem = 'Preencha todos os campos!';
      this.sucesso = false;
      return;
    }

    this.loading = true;
    this.mensagem = '';

    const novoCurso = {
      nomeCurso: this.nomeCurso,
      departamentoID: this.departamentoID
    };

    this.cursoService.cadastrar(novoCurso).subscribe({
      next: () => {
        this.sucesso = true;
        this.mensagem = 'Curso cadastrado com sucesso!';
        this.loading = false;
        
        // Redireciona após 1.5 segundos
        setTimeout(() => {
          this.router.navigate(['/cursos']);
        }, 1500);
      },
      error: (e) => {
        this.loading = false;
        this.sucesso = false;
        console.error(e);
        this.mensagem = 'Erro ao salvar. Verifique o console.';
      }
    });
  }

  cancelar() {
    this.router.navigate(['/cursos']);
  }
}