import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { AlertService } from './AlertService';

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptor implements HttpInterceptor {
  isAlertDisplayed: boolean = false;
  router = inject(Router);
  alertService = inject(AlertService);

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('authToken');

    const authReq = token
      ? req.clone({
          headers: req.headers.set('Authorization', `Bearer ${token}`),
        })
      : req;

    console.log('Intercepted request:', authReq);

    return next.handle(authReq).pipe(
      catchError((error) => {
        if (error.status === 401 && !this.isAlertDisplayed) {
          this.isAlertDisplayed = true;

          this.alertService
            .error({
              title: 'Session Expired',
              text: 'Your session has expired. Please log in again.',
            })
            .then(() => {
              this.isAlertDisplayed = false;
              this.router.navigate(['/']);
            });
        }
        return throwError(() => error);
      })
    );
  }
}
