import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfessorService, Professor } from '../../services/professor.service';

@Component({
  selector: 'app-professor-edit',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="form-container">
      <h2>✏️ Editar Professor</h2>
      
      <div class="form-group">
        <label>Nome:</label>
        <input [(ngModel)]="nome" type="text">
      </div>
      <div class="form-group">
        <label>Formação:</label>
        <input [(ngModel)]="formacao" type="text">
      </div>
      <div class="form-group">
        <label>Email:</label>
        <input [(ngModel)]="email" type="email">
      </div>

      <div class="actions">
        <button class="btn-salvar" (click)="atualizar()">Atualizar</button>
        <button class="btn-cancelar" (click)="cancelar()">Cancelar</button>
      </div>
    </div>
  `,
  
  styles: [`
    .form-container { max-width: 500px; margin: 40px auto; padding: 30px; background: white; border-radius: 8px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); font-family: sans-serif; }
    h2 { text-align: center; color: #2c3e50; margin-bottom: 25px; }
    .form-group { margin-bottom: 15px; }
    label { display: block; margin-bottom: 5px; font-weight: bold; color: #555; }
    input { width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 5px; }
    .actions { display: flex; gap: 10px; margin-top: 20px; }
    button { flex: 1; padding: 12px; border: none; border-radius: 5px; cursor: pointer; color: white; font-weight: bold; }
    .btn-salvar { background-color: #f39c12; }
    .btn-cancelar { background-color: #95a5a6; }
  `]
})
export class ProfessorEditComponent implements OnInit {
  private service = inject(ProfessorService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  id = 0;
  nome = '';
  formacao = '';
  email = '';

  ngOnInit() {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    if (this.id) this.carregar();
  }

  carregar() {
    this.service.getById(this.id).subscribe({
      next: (prof) => {
        this.nome = prof.professorNome;
        this.formacao = prof.formacao;
        this.email = prof.email;
      },
      error: (e: any) => console.error(e)
    });
  }

  atualizar() {
    const prof: Professor = {
      professorID: this.id,
      professorNome: this.nome,
      formacao: this.formacao,
      email: this.email
    };

    this.service.update(this.id, prof).subscribe({
      next: () => {
        alert('Professor atualizado!');
        this.router.navigate(['/professores']);
      },
      error: (e: any) => console.error(e)
    });
  }

  cancelar() { this.router.navigate(['/professores']); }
}