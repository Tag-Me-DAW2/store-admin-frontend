import { inject, Injectable } from '@angular/core';
import { AuthHttp } from './auth-http';
import { Observable } from 'rxjs/internal/Observable';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  httpClient = inject(AuthHttp);

  login(email: string, password: string): Observable<String> {
    return this.httpClient.login(email, password).pipe(
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
