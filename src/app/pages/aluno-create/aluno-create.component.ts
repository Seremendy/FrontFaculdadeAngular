import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AlunoService, Aluno } from '../../services/aluno.service';

@Component({
  selector: 'app-aluno-create',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="form-container">
      <h2>🎓 Novo Aluno</h2>
      
      <div class="form-group">
        <label>Nome Completo:</label>
        <input [(ngModel)]="nome" type="text" placeholder="Ex: Maria Silva">
      </div>

      <div class="row">
        <div class="form-group">
            <label>CPF:</label>
            <input [(ngModel)]="cpf" type="text" placeholder="000.000.000-00" maxlength="11">
        </div>
        <div class="form-group">
            <label>RG:</label>
            <input [(ngModel)]="rg" type="text" placeholder="00.000.000-0" maxlength="9">
        </div>
      </div>

      <div class="form-group">
        <label>Data de Nascimento:</label>
        <input [(ngModel)]="dataNascimento" type="date">
      </div>

      <div class="actions">
        <button class="btn-salvar" (click)="salvar()">Salvar</button>
        <button class="btn-cancelar" (click)="cancelar()">Cancelar</button>
      </div>
    </div>
  `,
  styles: [`
    .form-container { max-width: 500px; margin: 40px auto; padding: 30px; background: white; border-radius: 8px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); font-family: sans-serif; }
    h2 { text-align: center; color: #2c3e50; margin-bottom: 25px; }
    
    .form-group { margin-bottom: 15px; }
    .row { display: flex; gap: 15px; }
    .row .form-group { flex: 1; }

    label { display: block; margin-bottom: 5px; font-weight: bold; color: #555; }
    input { width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 5px; box-sizing: border-box; }
    input:focus { outline: none; border-color: #3498db; }

    .actions { display: flex; gap: 10px; margin-top: 20px; }
    button { flex: 1; padding: 12px; border: none; border-radius: 5px; cursor: pointer; font-weight: bold; font-size: 1rem; }
    .btn-salvar { background-color: #27ae60; color: white; }
    .btn-salvar:hover { background-color: #219150; }
    .btn-cancelar { background-color: #95a5a6; color: white; }
    .btn-cancelar:hover { background-color: #7f8c8d; }
  `]
})
export class AlunoCreateComponent {
  private service = inject(AlunoService);
  private router = inject(Router);

  nome = '';
  cpf = '';
  rg = '';
  dataNascimento = '';

  salvar() {
    if (!this.nome || !this.cpf || !this.dataNascimento) {
        alert('Preencha os campos obrigatórios!');
        return;
    }

    const novoAluno: Aluno = {
        alunoNome: this.nome,
        cpf: this.cpf,
        rg: this.rg,
        dataNascimento: this.dataNascimento
    };

    this.service.create(novoAluno).subscribe({
        next: () => {
            alert('Aluno matriculado com sucesso!');
            this.router.navigate(['/alunos']);
        },
        error: (e: any) => {
            console.error(e);
            alert('Erro ao salvar aluno. Verifique o console.');
        }
    });
  }

  cancelar() {
    this.router.navigate(['/alunos']);
  }
}