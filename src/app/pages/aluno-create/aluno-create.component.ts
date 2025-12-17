import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AlunoService } from '../../services/aluno.service';
import { Aluno } from '../../models/aluno.model';

@Component({
  selector: 'app-aluno-create',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './aluno-create.component.html',
  styleUrl: './aluno-create.component.css'
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