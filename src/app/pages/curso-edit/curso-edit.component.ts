import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CursoService, Curso } from '../../services/curso.service';

@Component({
  selector: 'app-curso-edit',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container">
      <h2>Editar Curso</h2>
      
      <label>Nome:</label>
      <input [(ngModel)]="nomeCurso" type="text">

      <label>Descrição:</label>
      <input [(ngModel)]="descricao" type="text">

      <label>Mensalidade:</label>
      <input [(ngModel)]="mensalidade" type="number">

      <label>ID Departamento:</label>
      <input [(ngModel)]="departamentoID" type="number">

      <button (click)="atualizar()">Atualizar</button>
      <button (click)="cancelar()">Cancelar</button>
    </div>
  `,
  styles: [`.container { padding: 20px; display: flex; flex-direction: column; gap: 10px; max-width: 400px; }`]
})
export class CursoEditComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private cursoService = inject(CursoService);

  id = 0;
  nomeCurso = '';
  descricao = '';
  mensalidade = 0;
  departamentoID = 0;

  ngOnInit() {
    // Pega o ID da URL
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    if (this.id) this.carregarDados();
  }

  carregarDados() {
    this.cursoService.obterPorId(this.id).subscribe({
      next: (curso: Curso) => {
        this.nomeCurso = curso.nomeCurso;
        this.descricao = curso.descricao;
        this.mensalidade = curso.mensalidade;
        // Usa o operador '??' para garantir que não fique undefined
        this.departamentoID = curso.departamentoID ?? 0;
      },
      error: (e: any) => console.error(e)
    });
  }

  atualizar() {
    const dadosAtualizados: Curso = {
      cursoID: this.id, // Importante mandar o ID
      nomeCurso: this.nomeCurso,
      descricao: this.descricao,
      mensalidade: this.mensalidade,
      departamentoID: this.departamentoID
    };

    this.cursoService.atualizar(this.id, dadosAtualizados).subscribe({
      next: () => {
        alert('Curso atualizado!');
        this.router.navigate(['/cursos']);
      },
      error: (e: any) => {
        console.error(e);
        alert('Erro ao atualizar.');
      }
    });
  }

  cancelar() {
    this.router.navigate(['/cursos']);
  }
}