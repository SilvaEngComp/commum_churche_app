import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ChurchSchedule } from '../models/churchSchedule';
import { FilterChurchSchedule } from '../models/filterChurchSchedule';
import { Responser } from '../models/responser';
import { ExceptionService } from './exception-service.service';
import { LoginService } from './login.service';
import { ServiceInterface } from './serviceInterface';

@Injectable({
  providedIn: 'root',
})
export class ChurchScheduleService extends ServiceInterface {
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

  async get(filter: FilterChurchSchedule): Promise<Responser> {
    if (!(await LoginService.getHeaders())) {
      this.checkLogged();
      return Promise.resolve(null);
    }
    return this.http
      .get<Responser>(
        `${environment.API2}/churchSchedules${filter.getRequest()}`,
        {
          headers: await LoginService.getHeaders(),
        }
      )
      .toPromise();
  }

  async store(churchschedule: ChurchSchedule): Promise<Responser> {
    if (!(await LoginService.getHeaders())) {
      this.checkLogged();
      return Promise.resolve(null);
    }
    console.log(JSON.stringify(churchschedule));
    return this.http
      .post<Responser>(`${environment.API2}/churchSchedules`, churchschedule, {
        headers: await LoginService.getHeaders(),
      })
      .toPromise();
  }
  async upload(
    formData: FormData,
    churchschedule: ChurchSchedule
  ): Promise<Responser> {
    if (!(await LoginService.getHeaders())) {
      this.checkLogged();
      return Promise.resolve(null);
    }
    console.log(JSON.stringify(churchschedule));
    return this.http
      .post<Responser>(
        `${environment.API2}/churchSchedules/${churchschedule.id}/upload`,
        formData,
        {
          headers: await LoginService.getHeaders(true),
        }
      )
      .toPromise();
  }

  async publish(churchschedule: ChurchSchedule, publish: boolean) {
    if (!(await LoginService.getHeaders())) {
      this.checkLogged();
      return Promise.resolve(null);
    }
    return this.http
      .get(
        `${environment.API2}/churchSchedules/${churchschedule.id}/publish/${publish}`,
        {
          headers: await LoginService.getHeaders(),
        }
      )
      .toPromise();
  }

  async update(churchschedule: ChurchSchedule): Promise<Responser> {
    if (!(await LoginService.getHeaders())) {
      this.checkLogged();
      return Promise.resolve(null);
    }
    return this.http
      .patch<Responser>(
        `${environment.API2}/churchSchedules/${churchschedule.id}`,
        churchschedule,
        {
          headers: await LoginService.getHeaders(),
        }
      )
      .toPromise();
  }

  async destroy(churchschedule: ChurchSchedule): Promise<Responser> {
    if (!(await LoginService.getHeaders())) {
      this.checkLogged();
      return Promise.resolve(null);
    }
    return this.http
      .delete<Responser>(
        `${environment.API2}/churchSchedules/${churchschedule.id}`,
        {
          headers: await LoginService.getHeaders(),
        }
      )
      .toPromise();
  }
}
