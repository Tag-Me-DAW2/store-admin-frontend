import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { LoginRequest } from '../models/request/login-request';
import { UserResponse } from '../models/response/user-response';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthHttp {
  apiUrl = environment.apiUrl + '/auth';

  HttpClient = inject(HttpClient);

  login(loginRequest: LoginRequest): Observable<{ token: string }> {
    return this.HttpClient.post<{ token: string }>(`${this.apiUrl}/login`, loginRequest);
  }

  logout(): Observable<void> {
    return this.HttpClient.post<void>(`${this.apiUrl}/logout`, {});
  }

  getUser(): Observable<UserResponse> {
    return this.HttpClient.get<UserResponse>(`${this.apiUrl}`);
  }
}
