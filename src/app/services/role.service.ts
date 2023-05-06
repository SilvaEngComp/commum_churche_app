import { ExceptionService } from './exception-service.service';
import { ServiceInterface } from './serviceInterface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LoginService } from './login.service';
import { Responser } from '../models/responser';
import { UserRole } from '../models/userRole';

@Injectable({
  providedIn: 'root',
})
export class RoleService extends ServiceInterface {
  constructor(
    protected http: HttpClient,
    protected exceptionService: ExceptionService
  ) {
    super(http, exceptionService);
  }

  async get(): Promise<Responser> {
    return this.http
      .get<Responser>(`${environment.API2}/roles`, {
        headers: LoginService.getHeaders(),
      })
      .toPromise();
  }

  async store(roles: UserRole[]): Promise<Responser> {
    if (!(await LoginService.getHeaders())) {
      this.checkLogged();
      return Promise.resolve(null);
    }
    console.clear();
    console.log(JSON.stringify(roles));
    return this.http
      .post<Responser>(`${environment.API2}/roles`, roles, {
        headers: LoginService.getHeaders(),
      })
      .toPromise();
  }
}
