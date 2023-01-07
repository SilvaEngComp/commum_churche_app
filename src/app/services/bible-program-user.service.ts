import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BibleReaderProgram } from '../models/bibleReaderProgram';
import { Responser } from '../models/responser';
import { VerseDay } from '../models/verseDay';
import { ExceptionService } from './exception-service.service';
import { LoginService } from './login.service';
import { ServiceInterface } from './serviceInterface';

@Injectable({
  providedIn: 'root',
})
export class BibleProgramUserService extends ServiceInterface {
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

  async getReaders(): Promise<Responser> {
    return this.http
      .get<Responser>(
        `${environment.API2}/bibleReaderProgramUsers/getReaders`,
        {
          headers: LoginService.getHeaders(),
        }
      )
      .toPromise();
  }

  async setAsDone(
    program: BibleReaderProgram,
    verseDay: VerseDay
  ): Promise<Responser> {
    console.log(
      `${environment.API2}/bibleReaderProgramUsers/setAsReadUnread/bibleReaderProgram/${program?.id}/bibleReaderMap/${verseDay?.id}`
    );
    return this.http
      .get<Responser>(
        `${environment.API2}/bibleReaderProgramUsers/setAsReadUnread/bibleReaderProgram/${program?.id}/bibleReaderMap/${verseDay?.id}`,
        {
          headers: LoginService.getHeaders(),
        }
      )
      .toPromise();
  }
}
