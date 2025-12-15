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

  onLogin(): void {
    this.authService.login(this.email, this.password).subscribe({
      next: (token: String) => {
        console.log('Login successful, token:', token);
        this.router.navigate(['/header']);
      },
      error: (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Credenciales inválidas',
          text: 'Por favor, verifica tu correo electrónico y contraseña e intenta nuevamente.',
        })
      },
    });
  }
}
