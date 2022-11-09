import { Responser } from './../models/responser';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ExceptionService } from './exception-service.service';
import { LoginService } from './login.service';

export class ServiceInterface {
  url: string;
  endpoint: string;
  constructor(
    protected http: HttpClient,
    protected exceptionService: ExceptionService
  ) {
    this.url = environment.API2;
  }

  checkLogged() {
    this.exceptionService.alertDialog(
      'Infelizmente sua conexão expirou. Saia e faça login novamente',
      'CONEXÃO EXPIRADA',
      true
    );
  }

  async get(filtro?: any): Promise<Responser> {
    return this.http
      .get<Responser>(`${this.url}/${this.endpoint}/${filtro.getRequest()}`, {
        headers: LoginService.getHeaders(),
      })
      .toPromise();
  }

  async store(data: any): Promise<any> {
    return this.http
      .post<any>(`${this.url}/${this.endpoint}`, data, {
        headers: LoginService.getHeaders(),
      })
      .toPromise();
  }

  async update(data: any) {
    return this.http
      .patch(`${this.url}/${this.endpoint}/${data.id}`, data, {
        headers: LoginService.getHeaders(),
      })
      .toPromise();
  }

  async destroy(data: any) {
    return this.http
      .delete(`${this.url}/${this.endpoint}/${data.id}`, {
        headers: LoginService.getHeaders(),
      })
      .toPromise();
  }
}
