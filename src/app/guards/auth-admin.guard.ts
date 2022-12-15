import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import jwt_decode from 'jwt-decode';
import { AuthToken } from '../types/AuthToken';

@Injectable({
  providedIn: 'root',
})
export class AuthAdminGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    let status = false;
    try {
      const token = window.localStorage.getItem('_token') || '';
      if (token) {
        const decoded: AuthToken = jwt_decode(token);
        const exp = decoded.exp * 1000;
        const deadline = new Date(exp);
        const today = new Date();
        if (deadline.getTime() < today.getTime()) {
          window.localStorage.removeItem('_token');
          this.router.navigate(['/login'], { replaceUrl: true });
        } else if (decoded.role == 'ADM') {
          status = true;
        } else {
          this.router.navigate(['/not-found'], { replaceUrl: true });
        }
      } else {
        this.router.navigate(['/login'], { replaceUrl: true });
      }
    } catch (error) {
      console.log(error);
    }
    return status;
  }
}
