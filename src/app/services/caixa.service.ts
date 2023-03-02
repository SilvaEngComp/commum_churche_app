import { LoginService } from './login.service';
import { Injectable, Provider } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Caixa } from '../models/caixa';
import { ExceptionService } from './exception-service.service';
import { CaixaFilter } from '../models/caixaFilter';
import { CaixaType } from '../models/caixaType';
import { Responser } from '../models/responser';
import { UiService } from './ui.service';
import { ServiceInterface } from './serviceInterface';

@Injectable({
  providedIn: 'root',
})
export class CaixaService extends ServiceInterface {
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

  async get(filter: CaixaFilter = new CaixaFilter()): Promise<Responser> {
    if (!(await LoginService.getHeaders())) {
      this.checkLogged();
      return Promise.resolve(null);
    }
    return this.http
      .get<Responser>(
        `${environment.API2}/caixas?${CaixaFilter.getRequest(filter)}`,
        {
          headers: LoginService.getHeaders(),
        }
      )
      .toPromise();
  }

  async getByType(data: string, tipo: CaixaType): Promise<Responser> {
    if (!(await LoginService.getHeaders())) {
      this.checkLogged();
      return Promise.resolve(null);
    }

    return this.http
      .get<Responser>(
        `${environment.API2}/caixas/tipo/${tipo.id}?data=${data}`,
        {
          headers: LoginService.getHeaders(),
        }
      )
      .toPromise();
  }

  async story(caixa: Caixa): Promise<Responser> {
    if (!(await LoginService.getHeaders())) {
      this.checkLogged();
      return Promise.resolve(null);
    }

    caixa.register = LoginService.getUser();
    caixa.amount = UiService.convertToNumber(String(caixa.amount));

    console.log(JSON.stringify(caixa));
    return this.http
      .post<Responser>(`${environment.API2}/caixas`, caixa, {
        headers: LoginService.getHeaders(),
      })
      .toPromise();
  }

  async update(caixa: Caixa): Promise<Responser> {
    if (!(await LoginService.getHeaders())) {
      this.checkLogged();
      return Promise.resolve(null);
    }

    return this.http
      .patch<Responser>(`${environment.API2}/caixas/${caixa.id}`, caixa, {
        headers: LoginService.getHeaders(),
      })
      .toPromise();
  }

  async delete(caixa: Caixa): Promise<Responser> {
    if (!(await LoginService.getHeaders())) {
      this.checkLogged();
      return Promise.resolve(null);
    }

    return this.http
      .delete<Responser>(`${environment.API2}/caixas/${caixa?.id}`, {
        headers: LoginService.getHeaders(),
      })
      .toPromise();
  }
}
