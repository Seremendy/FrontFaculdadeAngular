import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ProfessorService, Professor } from '../../services/professor.service';

@Component({
  selector: 'app-professor-create',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="form-container">
      <h2>👨‍🏫 Novo Professor</h2>
      
      <div class="form-group">
        <label>Nome Completo:</label>
        <input [(ngModel)]="nome" type="text" placeholder="Ex: Dr. Roberto">
      </div>

      <div class="form-group">
        <label>Formação (Titulação):</label>
        <input [(ngModel)]="formacao" type="text" placeholder="Ex: Doutor em Física">
      </div>

      <div class="form-group">
        <label>Email:</label>
        <input [(ngModel)]="email" type="email" placeholder="email@universidade.com">
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
    label { display: block; margin-bottom: 5px; font-weight: bold; color: #555; }
    input { width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 5px; box-sizing: border-box; }
    .actions { display: flex; gap: 10px; margin-top: 20px; }
    button { flex: 1; padding: 12px; border: none; border-radius: 5px; cursor: pointer; font-weight: bold; color: white; }
    .btn-salvar { background-color: #27ae60; }
    .btn-cancelar { background-color: #95a5a6; }
  `]
})
export class ProfessorCreateComponent {
  private service = inject(ProfessorService);
  private router = inject(Router);

  nome = '';
  formacao = '';
  email = '';

  salvar() {
    if (!this.nome) { alert('Nome é obrigatório!'); return; }

    const novoProf: Professor = {
      professorNome: this.nome,
      formacao: this.formacao,
      email: this.email
    };

    this.service.create(novoProf).subscribe({
      next: () => {
        alert('Professor cadastrado!');
        this.router.navigate(['/professores']);
      },
      error: (e: any) => console.error(e)
    });
  }

  cancelar() { this.router.navigate(['/professores']); }
}