import { Responser } from './../models/responser';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BibleReaderProgram } from '../models/bibleReaderProgram';
import { ExceptionService } from './exception-service.service';
import { LoginService } from './login.service';
import { ServiceInterface } from './serviceInterface';

@Injectable({
  providedIn: 'root',
})
export class BibleProgramService extends ServiceInterface {
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

  async get(): Promise<Responser> {
    if (!(await LoginService.getHeaders())) {
      this.checkLogged();
      return Promise.resolve(null);
    }
    return this.http
      .get<Responser>(`${environment.API2}/bibles`, {
        headers: LoginService.getHeaders(),
      })
      .toPromise();
  }

  async show(bibleProgram: BibleReaderProgram): Promise<Responser> {
    if (!(await LoginService.getHeaders())) {
      this.checkLogged();
      return Promise.resolve(null);
    }
    return this.http
      .get<Responser>(
        `${environment.API2}/bibles/getMapProgram/${bibleProgram?.id}`,
        {
          headers: LoginService.getHeaders(),
        }
      )
      .toPromise();
  }

  async story(biblereaderprogram: BibleReaderProgram): Promise<Responser> {
    if (!(await LoginService.getHeaders())) {
      this.checkLogged();
      return Promise.resolve(null);
    }

    console.log(JSON.stringify(biblereaderprogram));
    return this.http
      .post<Responser>(`${environment.API2}/bibles`, biblereaderprogram, {
        headers: LoginService.getHeaders(),
      })
      .toPromise();
  }

  async update(biblereaderprogram: BibleReaderProgram): Promise<Responser> {
    if (!(await LoginService.getHeaders())) {
      this.checkLogged();
      return Promise.resolve(null);
    }

    return this.http
      .patch<Responser>(
        `${environment.API2}/bibles/${biblereaderprogram.id}`,
        biblereaderprogram,
        {
          headers: LoginService.getHeaders(),
        }
      )
      .toPromise();
  }

  async delete(biblereaderprogram: BibleReaderProgram): Promise<Responser> {
    if (!(await LoginService.getHeaders())) {
      this.checkLogged();
      return Promise.resolve(null);
    }

    return this.http
      .delete<Responser>(
        `${environment.API2}/bibles/${biblereaderprogram?.id}`,
        {
          headers: LoginService.getHeaders(),
        }
      )
      .toPromise();
  }
}
