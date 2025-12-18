import { inject, Injectable } from '@angular/core';
import { AuthHttp } from './auth-http';
import { Observable } from 'rxjs/internal/Observable';
import { BehaviorSubject, tap } from 'rxjs';
import { LoginRequest } from '../models/request/login-request';
import { UserResponse } from '../models/response/user-response';
import { Router } from '@angular/router';
import { AlertService } from './AlertService';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  httpClient = inject(AuthHttp);
  router = inject(Router);
  alertService = inject(AlertService);

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
        this.alertService.error({
          title: 'Logout Failed',
          text: 'An error occurred while logging out. Please try again.',
        });
      },
    });
  }

  getUser(): Observable<UserResponse> {
    return this.httpClient.getUser().pipe(
      tap((user: UserResponse) => {
        if (!user || user.role !== 'ADMIN') {
          localStorage.removeItem('authToken');
          localStorage.removeItem('user');
          this.alertService.error({
            title: 'Access Denied',
            text: 'You do not have permission to access this application.',
          });
          this.router.navigate(['/']);
          return;
        }
        console.log('Fetched user:', user);
        user.profilePicture = user.profilePicture ? user.profilePicture : 'assets/user-icon.png';
        localStorage.setItem('user', JSON.stringify(user));
      })
    );
  }
}
