import { ChurchScheduleFilter } from './../models/churchScheduleFilter';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ChurchScheduleType } from '../models/churchScheduleType';
import { Responser } from '../models/responser';
import { ExceptionService } from './exception-service.service';
import { LoginService } from './login.service';
import { ServiceInterface } from './serviceInterface';
import { UiService } from './ui.service';

@Injectable({
  providedIn: 'root',
})
export class ChurchScheduleTypeService extends ServiceInterface {
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

  async get(filter: ChurchScheduleFilter): Promise<Responser> {
    if (!(await LoginService.getHeaders())) {
      this.checkLogged();
      return Promise.resolve(null);
    }
    console.log(
      `${
        environment.API2
      }/churchScheduleTypes?${ChurchScheduleFilter.getRequest(filter)}`
    );
    return this.http
      .get<Responser>(
        `${
          environment.API2
        }/churchScheduleTypes?${ChurchScheduleFilter.getRequest(filter)}`,
        {
          headers: LoginService.getHeaders(),
        }
      )
      .toPromise();
  }

  async story(churchscheduletype: ChurchScheduleType): Promise<Responser> {
    if (!(await LoginService.getHeaders())) {
      this.checkLogged();
      return Promise.resolve(null);
    }

    console.log(JSON.stringify(churchscheduletype));
    return this.http
      .post<Responser>(
        `${environment.API2}/churchScheduleTypes`,
        churchscheduletype,
        {
          headers: LoginService.getHeaders(),
        }
      )
      .toPromise();
  }

  async update(churchscheduletype: ChurchScheduleType): Promise<Responser> {
    if (!(await LoginService.getHeaders())) {
      this.checkLogged();
      return Promise.resolve(null);
    }

    return this.http
      .patch<Responser>(
        `${environment.API2}/churchScheduleTypes/${churchscheduletype.id}`,
        churchscheduletype,
        {
          headers: LoginService.getHeaders(),
        }
      )
      .toPromise();
  }

  async delete(churchscheduletype: ChurchScheduleType): Promise<Responser> {
    if (!(await LoginService.getHeaders())) {
      this.checkLogged();
      return Promise.resolve(null);
    }

    return this.http
      .delete<Responser>(
        `${environment.API2}/churchScheduleTypes/${churchscheduletype?.id}`,
        {
          headers: LoginService.getHeaders(),
        }
      )
      .toPromise();
  }
}
