import { ExceptionService } from './exception-service.service';
import { ServiceInterface } from './serviceInterface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LoginService } from './login.service';

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

  async get(): Promise<string[]> {
    return this.http
      .get<string[]>(`${environment.API2}/roles`, {
        headers: LoginService.getHeaders(),
      })
      .toPromise();
  }
}
