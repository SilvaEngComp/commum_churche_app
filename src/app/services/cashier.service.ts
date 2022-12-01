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

@Injectable({
  providedIn: 'root',
})
export class CaixaService {
  constructor(
    private http: HttpClient,
    private exceptionService: ExceptionService
  ) {}

  checkLogged() {
    this.exceptionService.alertDialog(
      'Infelizmente sua conexão expirou. Saia e faça login novamente',
      'CONEXÃO EXPIRADA',
      true
    );
  }

  async get(filtro: CaixaFilter = new CaixaFilter()): Promise<Caixa[]> {
    if (!(await LoginService.getHeaders())) {
      this.checkLogged();
      return Promise.resolve(null);
    }
    return this.http
      .get<Caixa[]>(`${environment.API2}/caixas?${filtro.getRequest()}`, {
        headers: LoginService.getHeaders(),
      })
      .toPromise();
  }

  async getByType(data: string, tipo: CaixaType): Promise<Caixa> {
    if (!(await LoginService.getHeaders())) {
      this.checkLogged();
      return Promise.resolve(null);
    }

    return this.http
      .get<Caixa>(`${environment.API2}/caixas/tipo/${tipo.id}?data=${data}`, {
        headers: LoginService.getHeaders(),
      })
      .toPromise();
  }

  async story(caixa: Caixa): Promise<Responser> {
    if (!(await LoginService.getHeaders())) {
      this.checkLogged();
      return Promise.resolve(null);
    }

    caixa.user = LoginService.getUser();
    caixa.amount = UiService.convertToNumber(String(caixa.amount));
    return this.http
      .post<Responser>(`${environment.API2}/caixas`, caixa, {
        headers: LoginService.getHeaders(),
      })
      .toPromise();
  }

  async update(caixa: Caixa) {
    if (!(await LoginService.getHeaders())) {
      this.checkLogged();
      return Promise.resolve(null);
    }

    return this.http
      .patch(`${environment.API2}/caixas/${caixa.id}`, caixa, {
        headers: LoginService.getHeaders(),
      })
      .toPromise();
  }

  async delete(id: number) {
    if (!(await LoginService.getHeaders())) {
      this.checkLogged();
      return Promise.resolve(null);
    }

    return this.http
      .delete(`${environment.API2}/caixas/${id}`, {
        headers: LoginService.getHeaders(),
      })
      .toPromise();
  }
}
