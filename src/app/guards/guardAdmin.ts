import { ExceptionService } from './../services/exception-service.service';
import { LoginService } from './../services/login.service';
import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardAdmin implements CanActivate {
  constructor(
    private router: Router,
    private exceptionService: ExceptionService
  ) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    return new Promise(async (resolve) => {
      try {
        if (LoginService.getHeaders()) {
          this.router.navigate(['admin']);
        }
        resolve(true);
      } catch (e) {
        localStorage.clear();

        this.router.navigate(['']);
        setTimeout(() => {
          window.location.reload();
        }, 1000);
        this.exceptionService.openLoading(
          'Erro!',
          'Algo de errado aconteceu com sua conexão. Faça login novamente!',
          false
        );
      }
    });
  }
}
