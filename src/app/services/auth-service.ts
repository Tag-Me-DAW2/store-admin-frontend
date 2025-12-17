import { inject, Injectable } from '@angular/core';
import { AuthHttp } from './auth-http';
import { Observable } from 'rxjs/internal/Observable';
import { BehaviorSubject, tap } from 'rxjs';
import { LoginRequest } from '../models/request/login-request';
import { UserResponse } from '../models/response/user-response';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  httpClient = inject(AuthHttp);
  router = inject(Router);

  login(email: string, password: string): Observable<{ token: string }> {
    let loginRequest: LoginRequest = { email, password };

    return this.httpClient.login(loginRequest).pipe(
      tap((response: { token: string }) => {
        localStorage.setItem('authToken', response.token);
      })
    );
  }

  logout(): void {
    this.httpClient.logout().subscribe({
      next: () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
        this.router.navigate(['/']);
      },
      error: (error) => {
        console.error('Logout failed', error);
      },
    });
  }

  getUser(): Observable<UserResponse> {
    return this.httpClient.getUser().pipe(
      tap((user: UserResponse) => {
        if (!user) {
          this.router.navigate(['/']);
          return;
        }

        localStorage.setItem('user', JSON.stringify(user));
      })
    );
  }
}
