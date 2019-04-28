import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenService } from '../../core/service/authen.service';
import { Router } from '@angular/router';
import { UrlConstant } from '../../core/common/url.constant'

@Injectable({
  providedIn: 'root'
})
export class GuardGuard implements CanActivate {

  constructor(private _authenService: AuthenService, private _router: Router) {

  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this._authenService.isUserAuthenticated()) {
      return true
    }
    else {
      this._router.navigate([UrlConstant.lOGIN], {
        queryParams: {
          returnUrl: state.url
        }
      });
      return false;
    }
  }
}
