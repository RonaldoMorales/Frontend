import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:5181/catedra3/Auth'; 

  constructor(private http: HttpClient) {}

  
  login(email: string, password: string): Observable<any> {
    return this.http.post<{ token: string }>(`${this.baseUrl}/login`, { email, password })
      .pipe(
        map(response => {
        
          localStorage.setItem('token', response.token);
          return response;
        })
      );
  }

  

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  
  isAuthenticated(): boolean {
    const token = this.getToken();
    return token !== null;
  }


  register(userData: { email: string, password: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, userData, { responseType: 'text' }).pipe(
      map(response => {
        try {
          return JSON.parse(response);
        } catch (e) {
          console.warn('La respuesta no era JSON válido, devolviendo texto:', response);
          return response;
        }
      }),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Error desconocido';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Código de error: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }

}