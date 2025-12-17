import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NotaService} from '../../services/nota.service';
import { Nota } from '../../models/nota.model';

@Component({
  selector: 'app-nota-edit',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './nota-edit.component.html', 
  styleUrl: './nota-edit.component.css'       
})
export class NotaEditComponent implements OnInit {
  private notaService = inject(NotaService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);



  nota: Nota | null = null;
  id = 0;
  
  isLoading = true;
  errorMessage = '';

  ngOnInit() {
    this.id = Number(this.route.snapshot.paramMap.get('id'));

    if (this.id) {
      this.carregarNota();
    } else {
      this.router.navigate(['/notas']);
    }
  }

  carregarNota() {
    this.isLoading = true;
    this.notaService.getById(this.id).subscribe({
      next: (dados: Nota) => {
        this.nota = dados;
        this.isLoading = false;
        // O Angular detecta essa mudança automaticamente
      },
      error: (err: any) => {
        console.error(err);
        this.errorMessage = 'Nota não encontrada.';
        this.isLoading = false;
        // Redireciona após 2 segundos se der erro
        setTimeout(() => this.router.navigate(['/notas']), 2000);
      }
    });
  }

  salvar() {
    if (this.nota && this.id) {
      this.isLoading = true;
      this.errorMessage = '';

      this.notaService.update(this.id, this.nota).subscribe({
        next: () => {
          // Sucesso
          this.router.navigate(['/notas']);
        },
        error: (err) => {
          console.error(err);
          this.errorMessage = 'Erro ao salvar alterações. Tente novamente.';
          this.isLoading = false;
        }
      });
    }
  }

  cancelar() {
    this.router.navigate(['/notas']);
  }
}