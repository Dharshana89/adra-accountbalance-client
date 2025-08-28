import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree,Router } from '@angular/router';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router,private tokenHelper: JwtHelperService) {}


  canActivate(): boolean {
    const token = localStorage.getItem('token');

    if (!token || this.tokenHelper.isTokenExpired(token)) {
      this.router.navigate(['/login']);
      return false;
    }

    return true;
  }
  
}
