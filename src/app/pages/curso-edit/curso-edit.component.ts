import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router'; // ActivatedRoute para pegar o ID da URL
import { CursoService } from '../../services/curso.service';

@Component({
  selector: 'app-curso-edit',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container">
      <h2>Editar Curso</h2>

      <div *ngIf="carregando" class="loading">Carregando dados do curso...</div>

      <div *ngIf="!carregando">
        <div class="form-group">
          <label>ID:</label>
          <input type="text" [value]="id" disabled style="background-color: #eee;">
        </div>

        <div class="form-group">
          <label>Nome do Curso:</label>
          <input type="text" [(ngModel)]="nomeCurso" placeholder="Ex: Engenharia">
        </div>

        <div class="form-group">
          <label>ID do Departamento:</label>
          <input type="number" [(ngModel)]="departamentoID" placeholder="Ex: 1">
        </div>

        <button (click)="atualizar()" [disabled]="salvando" class="btn-save">
          {{ salvando ? 'Salvando...' : 'Atualizar Curso' }}
        </button>
        
        <button (click)="cancelar()" class="btn-cancel">Cancelar</button>

        <p *ngIf="mensagem" [class.erro]="!sucesso" [class.sucesso]="sucesso">
          {{ mensagem }}
        </p>
      </div>
    </div>
  `,
  styles: [`
    .container { padding: 20px; max-width: 500px; font-family: Arial, sans-serif; }
    .form-group { margin-bottom: 15px; }
    label { display: block; margin-bottom: 5px; font-weight: bold; }
    input { width: 100%; padding: 8px; box-sizing: border-box; }
    button { padding: 10px 15px; margin-right: 10px; border: none; cursor: pointer; border-radius: 4px; color: white; }
    .btn-save { background-color: #ffc107; color: black; } /* Amarelo para editar */
    .btn-save:hover { background-color: #e0a800; }
    .btn-cancel { background-color: #6c757d; }
    .erro { color: red; margin-top: 10px; }
    .sucesso { color: green; margin-top: 10px; }
    .loading { font-style: italic; color: #666; }
  `]
})
export class CursoEditComponent implements OnInit {
  private cursoService = inject(CursoService);
  private router = inject(Router);
  private route = inject(ActivatedRoute); // Injeção para ler a URL

  id: number = 0;
  nomeCurso = '';
  departamentoID: number | null = null;
  
  carregando = true;
  salvando = false;
  mensagem = '';
  sucesso = false;

  ngOnInit() {
    // 1. Pegar o ID que veio na URL (ex: /cursos/editar/5)
    this.id = Number(this.route.snapshot.paramMap.get('id'));

    if (this.id) {
      this.buscarCurso();
    } else {
      this.mensagem = 'ID inválido.';
    }
  }

  buscarCurso() {
    this.cursoService.obterPorId(this.id).subscribe({
      next: (curso) => {
        // 2. Preencher o formulário com os dados que vieram do banco
        this.nomeCurso = curso.nomeCurso;
        this.departamentoID = curso.departamentoID;
        this.carregando = false;
      },
      error: (e) => {
        console.error(e);
        this.mensagem = 'Erro ao carregar curso.';
        this.carregando = false;
      }
    });
  }

  atualizar() {
    if (!this.nomeCurso || !this.departamentoID) {
      this.mensagem = 'Preencha todos os campos!';
      return;
    }

    this.salvando = true;
    this.mensagem = '';

    const dadosAtualizados = {
      nomeCurso: this.nomeCurso,
      departamentoID: this.departamentoID
    };

    this.cursoService.atualizar(this.id, dadosAtualizados).subscribe({
      next: () => {
        this.sucesso = true;
        this.mensagem = 'Curso atualizado com sucesso!';
        this.salvando = false;
        setTimeout(() => this.router.navigate(['/cursos']), 1500);
      },
      error: (e) => {
        this.salvando = false;
        this.sucesso = false;
        console.error(e);
        this.mensagem = 'Erro ao atualizar.';
      }
    });
  }

  cancelar() {
    this.router.navigate(['/cursos']);
  }
}