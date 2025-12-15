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

  login(loginRequest: LoginRequest): Observable<String> {
    return this.HttpClient.post<String>(`${this.apiUrl}/login`, loginRequest);
  }

  logout(): Observable<void> {
    return this.HttpClient.post<void>(`${this.apiUrl}/logout`, {});
  }
}
