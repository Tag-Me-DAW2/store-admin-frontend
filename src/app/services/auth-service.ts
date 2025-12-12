import { inject, Injectable } from '@angular/core';
import { AuthHttp } from './auth-http';
import { Observable } from 'rxjs/internal/Observable';
import { tap } from 'rxjs';
import { LoginRequest } from '../models/request/login-request';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  httpClient = inject(AuthHttp);

  login(email: string, password: string): Observable<String> {
    let loginRequest: LoginRequest = { email, password };

    return this.httpClient.login(loginRequest).pipe(
      tap((token: String) => {
        localStorage.setItem('authToken', token.toString());
      })
    );
  }

  logout(): void {
    this.httpClient.logout().subscribe({
      next: () => {
        localStorage.removeItem('authToken');
      },
      error: (error) => {
        console.error('Logout failed', error);
      },
    });
  }
}
