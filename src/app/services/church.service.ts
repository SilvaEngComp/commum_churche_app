import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Church } from '../models/church';
import { Responser } from '../models/responser';
import { ExceptionService } from './exception-service.service';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root',
})
export class ChurchService {
  constructor(
    protected http: HttpClient,
    protected exceptionService: ExceptionService
  ) {}

  checkLogged() {
    this.exceptionService.alertDialog(
      'Infelizmente sua conexão expirou. Saia e faça login novamente',
      'CONEXÃO EXPIRADA',
      true
    );
  }

  async get(): Promise<Responser> {
    return this.http
      .get<Responser>(`${environment.API}/churches`, {
        headers: LoginService.getHeaders(),
      })
      .toPromise();
  }
  async store(church: Church): Promise<Responser> {
    if (!(await LoginService.getHeaders())) {
      this.checkLogged();
      return Promise.resolve(null);
    }

    console.log(JSON.stringify(church));
    return this.http
      .post<Responser>(`${environment.API2}/churches`, church, {
        headers: LoginService.getHeaders(),
      })
      .toPromise();
  }

  async update(church: Church): Promise<Responser> {
    if (!(await LoginService.getHeaders())) {
      this.checkLogged();
      return Promise.resolve(null);
    }

    return this.http
      .patch<Responser>(`${environment.API2}/churches/${church.id}`, church, {
        headers: LoginService.getHeaders(),
      })
      .toPromise();
  }

  async delete(church: Church): Promise<Responser> {
    if (!(await LoginService.getHeaders())) {
      this.checkLogged();
      return Promise.resolve(null);
    }

    return this.http
      .delete<Responser>(`${environment.API2}/churches/${church?.id}`, {
        headers: LoginService.getHeaders(),
      })
      .toPromise();
  }
}
