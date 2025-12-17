import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms'; // <--- IMPORTANTE PARA O SELECT FUNCIONAR
import { forkJoin } from 'rxjs';

import { NotaService } from '../../services/nota.service';
import { AlunoService } from '../../services/aluno.service';
import { DisciplinaService } from '../../services/disciplina.service';

@Component({
  selector: 'app-nota-list',
  standalone: true,
  imports: [CommonModule, RouterLink, DecimalPipe, FormsModule], 
  templateUrl: './nota-list.component.html'
})
export class NotaListComponent implements OnInit {
  private notaService = inject(NotaService);
  private alunoService = inject(AlunoService);
  private disciplinaService = inject(DisciplinaService);

  // Dados brutos
  todasAsNotas: any[] = []; // Guarda tudo o que veio do banco
  alunos: any[] = [];       // Para preencher o dropdown
  
  // Dados exibidos
  notasFiltradas: any[] = []; // O que aparece na tabela
  alunoSelecionadoID: number = 0; // O ID do aluno escolhido no dropdown

  loading = true;
  errorMessage = '';

  ngOnInit() {
    this.carregarDados();
  }

  carregarDados() {
    this.loading = true;

    forkJoin({
      listaNotas: this.notaService.getAll(),
      listaAlunos: this.alunoService.getAll(),
      listaDisciplinas: this.disciplinaService.getAll()
    }).subscribe({
      next: (resultado) => {
        this.alunos = resultado.listaAlunos; // Guardamos a lista de alunos para o select

        // Mapeamos todas as notas (cruzando os dados)
        this.todasAsNotas = resultado.listaNotas.map(nota => {
          const aluno = resultado.listaAlunos.find(a => a.alunoID === nota.alunoID);
          const disciplina = resultado.listaDisciplinas.find(d => d.disciplinaID === nota.disciplinaID);

          return {
            ...nota,
            alunoNome: aluno ? aluno.alunoNome : 'Desconhecido',
            nomeDisciplina: disciplina ? disciplina.nomeDisciplina : 'Desconhecida'
          };
        });

        // Inicialmente mostramos tudo (ou nada, se preferir)
        this.filtrarNotas(); 
        
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = 'Erro ao carregar dados.';
        this.loading = false;
      }
    });
  }

  // Essa função roda toda vez que você muda o Select
  filtrarNotas() {
    if (this.alunoSelecionadoID == 0) {
      // Se selecionou "Todos" ou nada, mostra tudo
      this.notasFiltradas = this.todasAsNotas;
    } else {
      // Filtra apenas as notas daquele ID
      // Importante: converter para Number pois o value do select pode vir como string
      this.notasFiltradas = this.todasAsNotas.filter(n => n.alunoID === Number(this.alunoSelecionadoID));
    }
  }

  excluir(id: number) {
    if (confirm('Tem certeza que deseja excluir esta nota?')) {
      this.notaService.delete(id).subscribe({
        next: () => this.carregarDados(), // Recarrega tudo
        error: () => alert('Erro ao excluir nota.')
      });
    }
  }
}