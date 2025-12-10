import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlunoService, Aluno } from '../../services/aluno.service';

@Component({
  selector: 'app-aluno-edit',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="form-container">
      <h2>✏️ Editar Aluno</h2>
      
      <div class="form-group">
        <label>Nome Completo:</label>
        <input [(ngModel)]="nome" type="text">
      </div>

      <div class="row">
        <div class="form-group">
            <label>CPF:</label>
            <input [(ngModel)]="cpf" type="text">
        </div>
        <div class="form-group">
            <label>RG:</label>
            <input [(ngModel)]="rg" type="text">
        </div>
      </div>

      <div class="form-group">
        <label>Data de Nascimento:</label>
        <input [(ngModel)]="dataNascimento" type="date">
      </div>

      <div class="actions">
        <button class="btn-salvar" (click)="atualizar()">Atualizar</button>
        <button class="btn-cancelar" (click)="cancelar()">Cancelar</button>
      </div>
    </div>
  `,
  // Reutilizando os estilos do Create
  styles: [`
    .form-container { max-width: 500px; margin: 40px auto; padding: 30px; background: white; border-radius: 8px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); font-family: sans-serif; }
    h2 { text-align: center; color: #2c3e50; margin-bottom: 25px; }
    .form-group { margin-bottom: 15px; }
    .row { display: flex; gap: 15px; }
    .row .form-group { flex: 1; }
    label { display: block; margin-bottom: 5px; font-weight: bold; color: #555; }
    input { width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 5px; box-sizing: border-box; }
    .actions { display: flex; gap: 10px; margin-top: 20px; }
    button { flex: 1; padding: 12px; border: none; border-radius: 5px; cursor: pointer; font-weight: bold; color: white; }
    .btn-salvar { background-color: #f39c12; }
    .btn-salvar:hover { background-color: #d35400; }
    .btn-cancelar { background-color: #95a5a6; }
  `]
})
export class AlunoEditComponent implements OnInit {
  private service = inject(AlunoService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  id = 0;
  nome = '';
  cpf = '';
  rg = '';
  dataNascimento = '';

  ngOnInit() {
    // 1. Pega o ID da URL (ex: /alunos/editar/5)
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    if (this.id) this.carregarDados();
  }

  carregarDados() {
    this.service.getById(this.id).subscribe({
        next: (aluno) => {
            this.nome = aluno.alunoNome;
            this.cpf = aluno.cpf;
            this.rg = aluno.rg;
            // Precisamos cortar a data para o formato yyyy-MM-dd que o input aceita
            // Ex: "2000-01-01T00:00:00" -> "2000-01-01"
            if (aluno.dataNascimento) {
                this.dataNascimento = aluno.dataNascimento.split('T')[0];
            }
        },
        error: (e: any) => console.error(e)
    });
  }

  atualizar() {
    const alunoAtualizado: Aluno = {
        alunoID: this.id,
        alunoNome: this.nome,
        cpf: this.cpf,
        rg: this.rg,
        dataNascimento: this.dataNascimento
    };

    this.service.update(this.id, alunoAtualizado).subscribe({
        next: () => {
            alert('Dados atualizados!');
            this.router.navigate(['/alunos']);
        },
        error: (e: any) => {
            console.error(e);
            alert('Erro ao atualizar.');
        }
    });
  }

  cancelar() {
    this.router.navigate(['/alunos']);
  }
}