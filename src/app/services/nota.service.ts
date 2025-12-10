import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Nota {
  notaID?: number;
  notaValor: number;
  alunoID: number;
  disciplinaID: number;
}

@Injectable({
  providedIn: 'root'
})
export class NotaService {
  
  private http = inject(HttpClient);
  
  
  private apiUrl = 'https://localhost:7174/api/Notas'; 

  constructor() { }

  
  getAll(): Observable<Nota[]> {
    return this.http.get<Nota[]>(this.apiUrl);
  }

  
  getById(id: number): Observable<Nota> {
    return this.http.get<Nota>(`${this.apiUrl}/${id}`);
  }

  
  create(nota: Nota): Observable<Nota> {
    return this.http.post<Nota>(this.apiUrl, nota);
  }

  
  update(id: number, nota: Nota): Observable<any> {
    
    return this.http.put(`${this.apiUrl}/${id}`, { notaValor: nota.notaValor });
  }

  
  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}