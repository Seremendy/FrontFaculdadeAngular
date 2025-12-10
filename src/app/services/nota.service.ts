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
  // Injeção do HttpClient
  private http = inject(HttpClient);
  
  // URL da sua API C# (confira se a porta 5274 está correta no seu launchSettings.json)
  private apiUrl = 'http://localhost:5274/api/Notas'; 

  constructor() { }

  // LISTAR (GET)
  getAll(): Observable<Nota[]> {
    return this.http.get<Nota[]>(this.apiUrl);
  }

  // OBTER POR ID (GET) - Corrigindo o erro "getById does not exist"
  getById(id: number): Observable<Nota> {
    return this.http.get<Nota>(`${this.apiUrl}/${id}`);
  }

  // CRIAR (POST)
  create(nota: Nota): Observable<Nota> {
    return this.http.post<Nota>(this.apiUrl, nota);
  }

  // ATUALIZAR (PUT) - Corrigindo o erro "update does not exist"
  update(id: number, nota: Nota): Observable<any> {
    // O backend espera um UpdateNotaRequestDto que tem apenas a NotaValor
    return this.http.put(`${this.apiUrl}/${id}`, { notaValor: nota.notaValor });
  }

  // DELETAR (DELETE)
  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}