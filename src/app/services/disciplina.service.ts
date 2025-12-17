import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Disciplina } from '../models/disciplina.model';

@Injectable({ providedIn: 'root' })
export class DisciplinaService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/Disciplinas`;

  getAll(): Observable<Disciplina[]> {
    return this.http.get<Disciplina[]>(this.apiUrl);
  }
}