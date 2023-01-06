import { VerseDay } from './../models/verseDay';
import { Responser } from './../models/responser';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BibleReaderProgram } from '../models/bibleReaderProgram';
import { ExceptionService } from './exception-service.service';
import { LoginService } from './login.service';
import { ServiceInterface } from './serviceInterface';
import { BibleProgramMap } from '../models/bibleProgramMap';

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

  async show(
    bibleProgram: BibleReaderProgram = new BibleReaderProgram(),
    getAll: number = 0
  ): Promise<Responser> {
    if (!(await LoginService.getHeaders())) {
      this.checkLogged();
      return Promise.resolve(null);
    }
    console.log(
      `${environment.API2}/bibles/getMapProgram/${bibleProgram?.id}/getAll/${getAll}`
    );
    return this.http
      .get<Responser>(
        `${environment.API2}/bibles/getMapProgram/${bibleProgram?.id}/getAll/${getAll}`,
        {
          headers: LoginService.getHeaders(),
        }
      )
      .toPromise();
  }

  async getVerse(verseDay: VerseDay): Promise<Responser> {
    return this.http
      .get<Responser>(`${environment.API2}/bibles/getVerse/${verseDay?.id}`, {
        headers: LoginService.getHeaders(),
      })
      .toPromise();
  }

  async setAsDone(
    program: BibleReaderProgram,
    verseDay: VerseDay
  ): Promise<Responser> {
    console.log(
      `${environment.API2}/bibles/setAsReadUnread/bibleReaderProgram/${program?.id}/bibleReaderMap/${verseDay?.id}`
    );
    return this.http
      .get<Responser>(
        `${environment.API2}/bibles/setAsReadUnread/bibleReaderProgram/${program?.id}/bibleReaderMap/${verseDay?.id}`,
        {
          headers: LoginService.getHeaders(),
        }
      )
      .toPromise();
  }
}
