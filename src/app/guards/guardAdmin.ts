import { LoginService } from './../services/login.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardAdmin implements CanActivate {

  constructor(
    private router: Router,
  ) { }
  canActivate(

    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean> {
    return new Promise(async resolve => {

      if (LoginService.getHeaders()) {
        this.router.navigate(['cashier']);
      }
      resolve(true);

    });
  }

}
