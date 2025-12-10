import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Professor {
  professorID?: number;
  professorNome: string; // Atenção: deve ser igual à coluna do banco
  formacao: string;
  email: string;
}

@Injectable({ providedIn: 'root' })
export class ProfessorService {
  private http = inject(HttpClient);
  // Ajuste a porta se necessário (7174 ou a sua)
  private apiUrl = 'https://localhost:7174/api/Professores'; 

  getAll(): Observable<Professor[]> {
    return this.http.get<Professor[]>(this.apiUrl);
  }

  getById(id: number): Observable<Professor> {
    return this.http.get<Professor>(`${this.apiUrl}/${id}`);
  }

  create(prof: Professor): Observable<Professor> {
    return this.http.post<Professor>(this.apiUrl, prof);
  }

  update(id: number, prof: Professor): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, prof);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}