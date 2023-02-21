import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Responser } from '../models/responser';
import { Tithe } from '../models/tithe';
import { TitheFilter } from '../models/titheFilter';
import { ExceptionService } from './exception-service.service';
import { LoginService } from './login.service';
import { ServiceInterface } from './serviceInterface';

@Injectable({
  providedIn: 'root',
})
export class TitheService extends ServiceInterface {
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

  async get(filter: TitheFilter): Promise<Responser> {
    if (!(await LoginService.getHeaders())) {
      this.checkLogged();
      return Promise.resolve(null);
    }

    if (!filter) {
      filter = new TitheFilter();
    }
    console.log(`${environment.API2}/tithes${TitheFilter.getRequest(filter)}`);
    return this.http
      .get<Responser>(
        `${environment.API2}/tithes?${TitheFilter.getRequest(filter)}`,
        {
          headers: LoginService.getHeaders(),
        }
      )
      .toPromise();
  }

  async update(tithe: Tithe): Promise<Responser> {
    if (!(await LoginService.getHeaders())) {
      this.checkLogged();
      return Promise.resolve(null);
    }
    console.log(JSON.stringify(tithe));
    return this.http
      .patch<Responser>(`${environment.API2}/tithes/${tithe.id}`, tithe, {
        headers: LoginService.getHeaders(),
      })
      .toPromise();
  }
  async store(tithe: Tithe): Promise<Responser> {
    if (!(await LoginService.getHeaders())) {
      this.checkLogged();
      return Promise.resolve(null);
    }
    console.log(JSON.stringify(tithe));
    return this.http
      .post<Responser>(`${environment.API2}/tithes`, tithe, {
        headers: LoginService.getHeaders(),
      })
      .toPromise();
  }

  async delete(tithe: Tithe): Promise<Responser> {
    if (!(await LoginService.getHeaders())) {
      this.checkLogged();
      return Promise.resolve(null);
    }
    return this.http
      .delete<Responser>(`${environment.API2}/tithes/${tithe.id}`, {
        headers: LoginService.getHeaders(),
      })
      .toPromise();
  }
}
