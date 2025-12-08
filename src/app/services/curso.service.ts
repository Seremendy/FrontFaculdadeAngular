import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Curso } from '../models/curso.model';

@Injectable({
  providedIn: 'root'
})
export class CursoService {
  private http = inject(HttpClient);
  
  private apiUrl = 'https://localhost:5274/api/Cursos'; 

  constructor() { }

  listar(): Observable<Curso[]> {
    // O Interceptor vai adicionar o token Bearer aqui automaticamente
    return this.http.get<Curso[]>(this.apiUrl);
  }
}