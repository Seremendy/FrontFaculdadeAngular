import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { LoginRequest, LoginResponse } from '../models/auth.models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // ATENÇÃO: Verifique se esta porta (5274) é a mesma que seu backend está rodando
  private apiUrl = 'http://localhost:5274/api/Auth'; 
  private tokenKey = 'token_faculdade';

  constructor(private http: HttpClient) { }

  login(credentials: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, credentials).pipe(
      tap(response => {
        // Salva o token no LocalStorage do navegador
        localStorage.setItem(this.tokenKey, response.token);
      })
    );
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  register(dados: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, dados);
  }
}