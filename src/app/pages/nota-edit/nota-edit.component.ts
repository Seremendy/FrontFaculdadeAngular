import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotaService, Nota } from '../../services/nota.service';

@Component({
  selector: 'app-nota-edit',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container">
      <h2>Editar Nota</h2>
      
      @if (nota) {
        <div class="form-area">
          <label><strong>Aluno ID:</strong> {{ nota.alunoID }} (Somente Leitura)</label> <br>
          <label><strong>Disciplina ID:</strong> {{ nota.disciplinaID }} (Somente Leitura)</label> <br><br>

          <label>Valor da Nota:</label>
          <input type="number" [(ngModel)]="nota.notaValor" placeholder="0.0 a 10.0" step="0.1">
          
          <br><br>
          <button class="btn-save" (click)="salvar()">Salvar Alterações</button>
          <button class="btn-cancel" (click)="cancelar()">Cancelar</button>
        </div>
      } @else {
        <p class="loading">Carregando dados da nota...</p>
      }
    </div>
  `,
  styles: [`
    .container { padding: 20px; font-family: sans-serif; max-width: 500px; margin: 0 auto; }
    input { padding: 8px; margin-left: 10px; border: 1px solid #ccc; border-radius: 4px; }
    button { margin-right: 10px; padding: 8px 16px; cursor: pointer; border: none; border-radius: 4px; color: white; }
    .btn-save { background-color: #28a745; }
    .btn-cancel { background-color: #dc3545; }
    .loading { color: #666; font-style: italic; font-weight: bold; }
  `]
})
export class NotaEditComponent implements OnInit {
  private notaService = inject(NotaService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  
  // 2. Injete o detector de mudanças
  private cd = inject(ChangeDetectorRef); 

  nota: Nota | null = null;
  id: number = 0;

  ngOnInit() {
    this.id = Number(this.route.snapshot.paramMap.get('id'));

    if (this.id) {
      this.notaService.getById(this.id).subscribe({
        next: (dados: Nota) => {
          console.log('Dados recebidos e atribuindo à variável:', dados);
          
          this.nota = dados; 
          
          this.cd.detectChanges(); 
        },
        error: (err: any) => {
          console.error(err);
          alert('Erro ao buscar.');
          this.router.navigate(['/notas']);
        }
      });
    }
  }

  salvar() {
    if (this.nota && this.id) {
      this.notaService.update(this.id, this.nota).subscribe({
        next: () => {
          alert('Sucesso!');
          this.router.navigate(['/notas']);
        },
        error: () => alert('Erro ao salvar.')
      });
    }
  }

  cancelar() {
    this.router.navigate(['/notas']);
  }
}