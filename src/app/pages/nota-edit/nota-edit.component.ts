import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotaService, Nota } from '../../services/nota.service'; // Importe a interface Nota

@Component({
  selector: 'app-nota-edit',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container">
      <h2>Editar Nota</h2>
      
      <div *ngIf="nota">
        <label>Aluno ID: {{ nota.alunoID }} (Somente Leitura)</label> <br>
        <label>Disciplina ID: {{ nota.disciplinaID }} (Somente Leitura)</label> <br><br>

        <label>Valor da Nota:</label>
        <input type="number" [(ngModel)]="nota.notaValor" placeholder="0.0 a 10.0">
        
        <br><br>
        <button (click)="salvar()">Salvar Alterações</button>
        <button (click)="cancelar()">Cancelar</button>
      </div>
    </div>
  `,
  styles: [`
    .container {
      padding: 20px;
      font-family: sans-serif;
    }
    input {
      padding: 5px;
      margin-left: 10px;
    }
    button {
      margin-right: 10px;
      padding: 5px 10px;
      cursor: pointer;
    }
  `] 
  // ^^^ O erro de CSS geralmente é aqui! Verifique se fechou colchetes e crases corretamente.
})
export class NotaEditComponent implements OnInit {
  private notaService = inject(NotaService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  nota: Nota | null = null;
  id: number = 0;

  ngOnInit() {
    // Pega o ID da URL
    this.id = Number(this.route.snapshot.paramMap.get('id'));

    if (this.id) {
      // Corrigindo o erro de tipagem "Parameter 'nota' implicitly has an 'any' type"
      this.notaService.getById(this.id).subscribe({
        next: (dados: Nota) => {  // <--- Adicione o tipo ': Nota' aqui
          this.nota = dados;
        },
        error: (err: any) => {
          console.error('Erro ao buscar nota', err);
          alert('Nota não encontrada!');
          this.router.navigate(['/notas']);
        }
      });
    }
  }

  salvar() {
    if (this.nota && this.id) {
      this.notaService.update(this.id, this.nota).subscribe({
        next: () => {
          alert('Nota atualizada com sucesso!');
          this.router.navigate(['/notas']);
        },
        error: (err: any) => {
          console.error(err);
          alert('Erro ao atualizar nota.');
        }
      });
    }
  }

  cancelar() {
    this.router.navigate(['/notas']);
  }
}