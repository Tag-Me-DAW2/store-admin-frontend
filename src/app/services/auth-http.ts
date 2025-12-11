import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { LoginRequest } from '../models/request/login-request';

@Injectable({
  providedIn: 'root',
})
export class AuthHttp {
  apiUrl = 'http://localhost:8080/auth';

  HttpClient = inject(HttpClient);

  login(email: string, password: string): Observable<String> {
    let loginRequest: LoginRequest = { email, password };
    console.log('Sending login request:', loginRequest);

    return this.HttpClient.post<String>(`${this.apiUrl}/login`, loginRequest);
  }

  logout(): Observable<void> {
    let header = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('authToken')}`,
    });

    return this.HttpClient.post<void>(`${this.apiUrl}/logout`, { headers: header });
  }
}
