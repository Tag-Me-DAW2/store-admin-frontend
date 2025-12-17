import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth-service';
import { inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'login-page',
  templateUrl: './login-page.html',
  styleUrl: './login-page.scss',
  imports: [FormsModule],
})
export class LoginPage {
  email: string = '';
  password: string = '';

  authService = inject(AuthService);
  router = inject(Router);

  ngOnInit(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
  }

  onLogin(): void {
    this.authService.login(this.email, this.password).subscribe({
      next: (token: Object) => {
        console.log('Login successful, token:', token);
        this.authService.getUser().subscribe({
          next: () => {
            this.router.navigate(['/dashboard']);
          },
          error: (err) => {
            console.error('Failed to fetch user after login', err);
          },
        });
      },
      error: (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Credenciales inválidas',
          text: 'Por favor, verifica tu correo electrónico y contraseña e intenta nuevamente.',
        });
      },
    });
  }
}
