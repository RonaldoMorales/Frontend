import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { JwtPayload, jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    const token = localStorage.getItem('token');
    
    if (token) {
      try {
        const decodedToken = jwtDecode(token) as JwtPayload & { exp?: number };
        
        if ('exp' in decodedToken) {
          if (decodedToken.exp! * 1000 < Date.now()) {
            localStorage.removeItem('token');
            this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
            alert('Tu sesión ha expirado. Debes iniciar sesión de nuevo.');
            return false;
          }
        } else {
          localStorage.removeItem('token');
          this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
          alert('El token no es válido');
          return false;
        }
        return true; 
      } catch (error) {
        localStorage.removeItem('token');
        alert('Debe iniciar sesión');
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
        
        return false;
      }
    } else {
      alert('Debe iniciar sesión');
      this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
      return false;
    }
  }
}