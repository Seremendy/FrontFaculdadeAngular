import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Curso {
  cursoID?: number; 
  nomeCurso: string;
  descricao: string;
  mensalidade: number;
  departamentoID?: number;
}

@Injectable({ providedIn: 'root' })
export class CursoService {
  private http = inject(HttpClient);
  private apiUrl = 'https://localhost:7174/api/Cursos';

  listar(): Observable<Curso[]> {
    return this.http.get<Curso[]>(this.apiUrl);
  }

  obterPorId(id: number): Observable<Curso> {
    return this.http.get<Curso>(`${this.apiUrl}/${id}`);
  }

  cadastrar(curso: Curso): Observable<Curso> {
    return this.http.post<Curso>(this.apiUrl, curso);
  }

  atualizar(id: number, curso: Curso): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, curso);
  }

  excluir(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}