import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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

  register(userData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, userData);
  }
}