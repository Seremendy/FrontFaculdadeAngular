import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { LoginRequest } from '../models/login-request';
import { RegisterRequest } from '../models/register-request';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://localhost:7174/api/Auth'; 

  constructor(private http: HttpClient) { }

  login(usuario: LoginRequest): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, usuario).pipe(
      tap(response => {
        // Sucesso! O Backend devolveu um token. Vamos guardar.
        if (response.token) {
          localStorage.setItem('token', response.token);
          // Opcional: Salvar o usuário também se o backend devolver
          // localStorage.setItem('user', JSON.stringify(response.user)); 
        }
      })
    );
  }

  register(usuario: RegisterRequest): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, usuario);
  }

  logout(): void {
    localStorage.clear(); // Limpa tudo (token e dados do usuário)
  }

  isLoggedIn(): boolean {
    // Verifica se existe um token salvo
    return !!localStorage.getItem('token');
  }
  
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  deleteUser(id: number): Observable<any> {
  return this.http.delete(`${this.apiUrl}/${id}`);
  }

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}