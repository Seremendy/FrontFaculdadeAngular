import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Professor } from '../models/professor.model';

@Injectable({ providedIn: 'root' })
export class ProfessorService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/Professores`; 

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