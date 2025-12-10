import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { LoginRequest } from '../models/login-request';
import { RegisterRequest } from '../models/register-request';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private platformId = inject(PLATFORM_ID);
  private apiUrl = 'https://localhost:7174/api/Auth';


  constructor(private https: HttpClient) { }

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

  getToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
        return localStorage.getItem('token');
    }
    return null;
  }

  isLoggedIn(): boolean {
    if (isPlatformBrowser(this.platformId)) {
        return !!localStorage.getItem('token');
    }
    return false;
  }

  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
        localStorage.clear();
    }
  }

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/users`);
  }
  
  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}