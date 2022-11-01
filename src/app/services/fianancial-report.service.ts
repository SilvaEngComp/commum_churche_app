import { ServiceInterface } from './serviceInterface';
import { FinancialReport } from '../models/financyReport';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ExceptionService } from './exception-service.service';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root',
})
export class FinancialReportService extends ServiceInterface {
  constructor(
    protected http: HttpClient,
    protected exceptionService: ExceptionService
  ) {
    super(http, exceptionService);
  }

  async get(date: string): Promise<any> {
    console.log(`${environment.API2}/financialReport/${date}`);
    return this.http
      .get<FinancialReport>(`${environment.API2}/financialReport/${date}`, {
        headers: LoginService.getHeaders(),
      })
      .toPromise();
  }
}
