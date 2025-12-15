import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { Router } from "@angular/router";
import { catchError, Observable, throwError } from "rxjs";
import Swal from "sweetalert2";

@Injectable({
  providedIn: 'root',
})

export class AuthInterceptor implements HttpInterceptor {
    isAlertDisplayed: boolean = false;
    router = inject(Router);

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = localStorage.getItem('authToken');

        const authReq = token ? req.clone({
            headers: req.headers.set('Authorization', `Bearer ${token}`)
        }) : req;

        return next.handle(authReq).pipe(
            catchError((error) => {
                if (error.status === 401 && !this.isAlertDisplayed) {
                    this.isAlertDisplayed = true;

                    Swal.fire({
                        icon: 'error',
                        title: 'Permiso denegado',
                        text: 'No tienes permiso para acceder a este recurso. Por favor, inicia sesión nuevamente.',
                    }).then(() => {
                        this.isAlertDisplayed = false;
                        this.router.navigate(['/']);
                    });
                }

                return throwError(() => error);
            } 
        ));
    }
}