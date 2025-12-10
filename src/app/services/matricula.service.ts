import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Matricula {
  matriculaID?: number;
  alunoID: number;
  cursoID: number;
  dataMatricula: string;
}

@Injectable({ providedIn: 'root' })
export class MatriculaService {
  private http = inject(HttpClient);
  private apiUrl = 'https://localhost:7174/api/Matriculas';

  getAll(): Observable<Matricula[]> {
    return this.http.get<Matricula[]>(this.apiUrl);
  }

  // NOVO: Método criar
  create(matricula: Matricula): Observable<Matricula> {
    return this.http.post<Matricula>(this.apiUrl, matricula);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}