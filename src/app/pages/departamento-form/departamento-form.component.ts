import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { DepartamentoService } from '../../services/departamento.service';
import { Departamento } from '../../models/departamento.model';

@Component({
  selector: 'app-departamento-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './departamento-form.component.html',
  styleUrl: './departamento-form.component.css'
})
export class DepartamentoFormComponent implements OnInit {
  private departamentoService = inject(DepartamentoService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  // Inicializa o objeto
  departamento: Departamento = {
    departamentoID: 0,
    departamentoNome: ''
  };

  isEditMode = false;

  ngOnInit() {
    // Verifica se tem ID na URL (Modo Edição)
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.carregarDepartamento(Number(id));
    }
  }

  carregarDepartamento(id: number) {
    this.departamentoService.getById(id).subscribe({
      next: (dados) => this.departamento = dados,
      error: (err) => {
        alert('Erro ao carregar departamento');
        this.router.navigate(['/departamentos']);
      }
    });
  }

  salvar() {
    if (this.isEditMode) {
      this.departamentoService.update(this.departamento.departamentoID, this.departamento).subscribe({
        next: () => {
          alert('Departamento atualizado!');
          this.router.navigate(['/departamentos']);
        },
        error: (err) => alert('Erro ao atualizar: ' + (err.error?.message || 'Erro desconhecido'))
      });
    } else {
      this.departamentoService.create(this.departamento).subscribe({
        next: () => {
          alert('Departamento criado!');
          this.router.navigate(['/departamentos']);
        },
        error: (err) => alert('Erro ao criar: ' + (err.error?.message || 'Erro desconhecido'))
      });
    }
  }
}