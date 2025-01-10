import { HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpEvent } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const jwtInterceptor: HttpInterceptorFn = (request: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> => {
  const router = inject(Router);
  const token = localStorage.getItem('token');

  if (token) {
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  return next(request).pipe(
    catchError(error => {
      if (error.status === 401) {
        
        //Hice esta funcion para que se limpie el token si es que se ingresa un usuario invalido
        //De esta forma si el usuario no habia cerrado sesion, se limpiara el token cuando
        //se intente ingresar con un usuario invalido
        
        localStorage.removeItem('token'); 
        router.navigate(['/login'], { queryParams: { returnUrl: request.url } });
       
      }
      return throwError(error);
    })
  );
};