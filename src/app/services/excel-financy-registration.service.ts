import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Caixa } from '../models/caixa';
import { Responser } from '../models/responser';
import { ExceptionService } from './exception-service.service';
import { LoginService } from './login.service';
import { ServiceInterface } from './serviceInterface';
import { Tithe } from '../models/tithe';
import { ImportCaixaExcel } from '../models/importCaixaExcel';

@Injectable({
  providedIn: 'root',
})
export class ExcelFinancyRegistrationService extends ServiceInterface {
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
  async importExcelResgistration(
    importCaixaExcel: ImportCaixaExcel[]
  ): Promise<Responser> {
    if (!(await LoginService.getHeaders())) {
      this.checkLogged();
      return Promise.resolve(null);
    }
    console.log(JSON.stringify(importCaixaExcel));
    return this.http
      .post<Responser>(
        `${environment.API2}/excelManage/registration`,
        importCaixaExcel,
        {
          headers: await LoginService.getHeaders(true),
        }
      )
      .toPromise();
  }
}
