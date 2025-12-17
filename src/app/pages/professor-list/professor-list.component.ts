import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { ProfessorService } from '../../services/professor.service';
import { Professor } from '../../models/professor.model';

@Component({
  selector: 'app-professor-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './professor-list.component.html', // Arquivo externo
  styleUrl: './professor-list.component.css'       // Arquivo externo
})
export class ProfessorListComponent implements OnInit {
  private router = inject(Router);
  private service = inject(ProfessorService);
  
  professores: Professor[] = [];
  loading = true;
  errorMessage = '';

  ngOnInit() {
    this.carregar();
  }

  carregar() {
    this.loading = true;
    this.service.getAll().subscribe({
      next: (dados) => { 
        this.professores = dados; 
        this.loading = false; 
      },
      error: (e: any) => { 
        console.error(e); 
        this.errorMessage = 'Não foi possível carregar a lista de professores.';
        this.loading = false; 
      }
    });
  }

  novoProfessor() {
    this.router.navigate(['/professores/novo']);
  }

  editarProfessor(professor: Professor) {
    const id = professor.professorID;
    if (id === undefined || id === null) { return; }
    this.router.navigate(['/professores/editar', id]);
  }

  confirmarExcluir(professor: Professor) {
    const id = professor.professorID;
    if (id === undefined || id === null) { return; }

    const nome = professor.professorNome || 'este professor';
    if (confirm(`Tem certeza que deseja remover ${nome}?`)) {
      this.service.delete(id).subscribe({
        next: () => this.carregar(),
        error: (e: any) => {
          console.error(e);
          alert('Erro ao excluir professor. Verifique se ele possui vínculos (turmas/notas).');
        }
      });
    }
  }
}