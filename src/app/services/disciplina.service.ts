import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Disciplina {
  disciplinaID?: number;
  nomeDisciplina: string;
}

@Injectable({ providedIn: 'root' })
export class DisciplinaService {
  private http = inject(HttpClient);
  private apiUrl = 'https://localhost:7174/api/Disciplinas';

  getAll(): Observable<Disciplina[]> {
    return this.http.get<Disciplina[]>(this.apiUrl);
  }
}