import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Aluno {
  alunoID?: number;
  alunoNome: string;
  cpf: string;
  rg: string;
  dataNascimento: string; 
}

@Injectable({ providedIn: 'root' })
export class AlunoService {
  private http = inject(HttpClient);
  private apiUrl = 'https://localhost:7174/api/Alunos';

  
  getAlunos(): Observable<Aluno[]> {
    return this.http.get<Aluno[]>(this.apiUrl);
  }

  
  getById(id: number): Observable<Aluno> {
    return this.http.get<Aluno>(`${this.apiUrl}/${id}`);
  }

  
  create(aluno: Aluno): Observable<Aluno> {
    return this.http.post<Aluno>(this.apiUrl, aluno);
  }

  
  update(id: number, aluno: Aluno): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, aluno);
  }

  
  deleteAluno(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}