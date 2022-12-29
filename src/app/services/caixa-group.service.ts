import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CaixaGroup } from '../models/caixaGroup';
import { Responser } from '../models/responser';
import { ExceptionService } from './exception-service.service';
import { LoginService } from './login.service';
import { ServiceInterface } from './serviceInterface';

@Injectable({
  providedIn: 'root',
})
export class CaixaGroupService extends ServiceInterface {
  constructor(
    protected http: HttpClient,
    protected exceptionService: ExceptionService
  ) {
    super(http, exceptionService);
  }

  checkLogged() {
    this.exceptionService.alertDialog(
      'Infelizmente sua conexão expirou. Saia e faça login novamente',
      'CONEXÃO EXPIRADA',
      true
    );
  }

  async get(): Promise<Responser> {
    if (!(await LoginService.getHeaders())) {
      this.checkLogged();
      return Promise.resolve(null);
    }
    return this.http
      .get<Responser>(`${environment.API2}/caixaGroups`, {
        headers: LoginService.getHeaders(),
      })
      .toPromise();
  }

  async store(caixagroup: CaixaGroup): Promise<Responser> {
    if (!(await LoginService.getHeaders())) {
      this.checkLogged();
      return Promise.resolve(null);
    }

    console.log(JSON.stringify(caixagroup));
    return this.http
      .post<Responser>(`${environment.API2}/caixaGroups`, caixagroup, {
        headers: LoginService.getHeaders(),
      })
      .toPromise();
  }

  async update(caixagroup: CaixaGroup): Promise<Responser> {
    if (!(await LoginService.getHeaders())) {
      this.checkLogged();
      return Promise.resolve(null);
    }

    return this.http
      .patch<Responser>(
        `${environment.API2}/caixaGroups/${caixagroup.id}`,
        caixagroup,
        {
          headers: LoginService.getHeaders(),
        }
      )
      .toPromise();
  }

  async delete(caixagroup: CaixaGroup): Promise<Responser> {
    if (!(await LoginService.getHeaders())) {
      this.checkLogged();
      return Promise.resolve(null);
    }

    return this.http
      .delete<Responser>(`${environment.API2}/caixaGroups/${caixagroup?.id}`, {
        headers: LoginService.getHeaders(),
      })
      .toPromise();
  }
}
