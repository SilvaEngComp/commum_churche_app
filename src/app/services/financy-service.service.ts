import { FinancySummaryFilter } from './../models/financySummaryFilter';
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

  async getTotalInputOutput(filter: FinancySummaryFilter): Promise<Responser> {
    if (!(await LoginService.getHeaders())) {
      this.checkLogged();
      return Promise.resolve(null);
    }

    console.log(
      `${
        environment.API2
      }/financies/getTotalInputOutput?${FinancySummaryFilter.getRequest(
        filter
      )}`
    );
    return this.http
      .get<Responser>(
        `${
          environment.API2
        }/financies/getTotalInputOutput?${FinancySummaryFilter.getRequest(
          filter
        )}`,
        {
          headers: LoginService.getHeaders(),
        }
      )
      .toPromise();
  }
  async getInput(filter: FinancySummaryFilter): Promise<Responser> {
    if (!(await LoginService.getHeaders())) {
      this.checkLogged();
      return Promise.resolve(null);
    }

    console.log(
      `${environment.API2}/financies/getInput?${FinancySummaryFilter.getRequest(
        filter
      )}`
    );
    return this.http
      .get<Responser>(
        `${
          environment.API2
        }/financies/getInput?${FinancySummaryFilter.getRequest(filter)}`,
        {
          headers: LoginService.getHeaders(),
        }
      )
      .toPromise();
  }
  async getOutput(filter: FinancySummaryFilter): Promise<Responser> {
    if (!(await LoginService.getHeaders())) {
      this.checkLogged();
      return Promise.resolve(null);
    }

    console.log(
      `${
        environment.API2
      }/financies/getOutput?${FinancySummaryFilter.getRequest(filter)}`
    );
    return this.http
      .get<Responser>(
        `${
          environment.API2
        }/financies/getOutput?${FinancySummaryFilter.getRequest(filter)}`,
        {
          headers: LoginService.getHeaders(),
        }
      )
      .toPromise();
  }
}
