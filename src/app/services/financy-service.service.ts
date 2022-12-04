import { FinancySummaryFilter } from './../models/financySummaryFilter';
import { CaixaSummary } from './../models/caixaSummary';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Responser } from '../models/responser';
import { ExceptionService } from './exception-service.service';
import { LoginService } from './login.service';
import { ServiceInterface } from './serviceInterface';

@Injectable({
  providedIn: 'root',
})
export class FinancyService extends ServiceInterface {
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

  async caixaSummary(filter: FinancySummaryFilter): Promise<Responser> {
    if (!(await LoginService.getHeaders())) {
      this.checkLogged();
      return Promise.resolve(null);
    }

    if (!filter?.month || !filter?.year) {
      this.exceptionService.alertDialog('Selecione um mês e um ano', 'Erro');
      return Promise.resolve(null);
    }

    return this.http
      .get<Responser>(
        `${environment.API2}/financies/caixaSummary/month/${filter?.month}/year/${filter?.year}`,
        {
          headers: LoginService.getHeaders(),
        }
      )
      .toPromise();
  }
}
