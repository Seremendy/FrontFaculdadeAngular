import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ProfessorService} from '../../services/professor.service';
import { Professor } from '../../models/professor.model';

@Component({
  selector: 'app-professor-create',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './professor-create.component.html', 
  styleUrl: './professor-create.component.css'       
})
export class ProfessorCreateComponent {
  private service = inject(ProfessorService);
  private router = inject(Router);

  
  professor: Professor = {
  // professorID é opcional, não precisa por
  professorNome: '',
  formacao: '',
  // Novos campos obrigatórios inicializados vazios para não dar erro:
  dataNascimento: new Date().toISOString().substring(0, 10), // Inicializa com data de hoje YYYY-MM-DD
  rg: '',
  cpf: ''
};

  isLoading = false;
  errorMessage = '';

  salvar() {
    // Validação básica
    if (!this.professor.professorNome) {
      this.errorMessage = 'O nome do professor é obrigatório!';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    this.service.create(this.professor).subscribe({
      next: () => {
        // Sucesso: Redireciona para a lista
        this.router.navigate(['/professores']);
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = 'Erro ao cadastrar professor. Tente novamente.';
        this.isLoading = false;
      }
    });
  }

  cancelar() {
    this.router.navigate(['/professores']);
  }
}