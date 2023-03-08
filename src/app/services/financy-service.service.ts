/* eslint-disable @typescript-eslint/naming-convention */
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
      JSON.stringify({
        dateI: filter.dateI,
        dateF: filter.dateF,
        wallet_id: filter.wallet_id,
      })
    );
    return this.http
      .post<Responser>(
        `${environment.API2}/financies/totalInputOutput`,
        {
          dateI: filter.dateI,
          dateF: filter.dateF,
          wallet_id: filter.wallet_id,
        },
        {
          headers: LoginService.getHeaders(),
        }
      )
      .toPromise();
  }
  async getInputs(filter: FinancySummaryFilter): Promise<Responser> {
    if (!(await LoginService.getHeaders())) {
      this.checkLogged();
      return Promise.resolve(null);
    }

    console.log(
      JSON.stringify({
        dateI: filter.dateI,
        dateF: filter.dateF,
        wallet_id: filter.wallet_id,
      })
    );
    return this.http
      .post<Responser>(
        `${environment.API2}/financies/inputs`,
        {
          dateI: filter.dateI,
          dateF: filter.dateF,
          wallet_id: filter.wallet_id,
        },
        {
          headers: LoginService.getHeaders(),
        }
      )
      .toPromise();
  }
  async getOutputs(filter: FinancySummaryFilter): Promise<Responser> {
    if (!(await LoginService.getHeaders())) {
      this.checkLogged();
      return Promise.resolve(null);
    }
    console.clear();
    console.log(
      JSON.stringify({
        dateI: filter.dateI,
        dateF: filter.dateF,
        wallet_id: filter.wallet_id,
      })
    );

    return this.http
      .post<Responser>(
        `${environment.API2}/financies/outputs`,
        {
          dateI: filter.dateI,
          dateF: filter.dateF,
          wallet_id: filter.wallet_id,
        },
        {
          headers: LoginService.getHeaders(),
        }
      )
      .toPromise();
  }
}
