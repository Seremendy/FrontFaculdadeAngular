import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Curso } from '../models/curso.model';

@Injectable({ providedIn: 'root' })
export class CursoService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/Cursos`;

  getAll(): Observable<Curso[]> {
    return this.http.get<Curso[]>(this.apiUrl);
  }

  getById(id: number): Observable<Curso> {
    return this.http.get<Curso>(`${this.apiUrl}/${id}`);
  }

  create(curso: Curso): Observable<Curso> {
    return this.http.post<Curso>(this.apiUrl, curso);
  }

  update(id: number, curso: Curso): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, curso);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}