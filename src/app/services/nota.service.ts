import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NotaService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/Notas`;

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  create(nota: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, nota);
  }

  update(id: number, nota: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, nota);
  }

  delete(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}