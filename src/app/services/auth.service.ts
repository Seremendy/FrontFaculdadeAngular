import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { LoginRequest, LoginResponse, RegisterRequest } from '../models/auth.models';
import { environment } from '../../environments/environment';

export interface UsuarioSistema {
  usuarioID: number;
  login: string;
  role: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private apiUrl = `${environment.apiUrl}/Auth`;

  constructor() { }

  // --- LOGIN ---
  login(credenciais: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, credenciais).pipe(
      tap(response => {
        localStorage.setItem('auth_token', response.token);
      })
    );
  }

  logout() {
    localStorage.removeItem('auth_token');
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }


  register(dados: RegisterRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, dados);
  }

  getUsers(): Observable<UsuarioSistema[]> {
    return this.http.get<UsuarioSistema[]>(this.apiUrl);
  }
  
  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}