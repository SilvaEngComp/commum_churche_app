import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Responser } from '../models/responser';
import { UserVerseMark } from '../models/userversemark';
import { ExceptionService } from './exception-service.service';
import { LoginService } from './login.service';
import { ServiceInterface } from './serviceInterface';

@Injectable({
  providedIn: 'root',
})
export class UserVerseMarkService extends ServiceInterface {
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

  async store(userversemark: UserVerseMark): Promise<Responser> {
    console.log(JSON.stringify(userversemark));
    return this.http
      .post<Responser>(`${environment.API2}/userVerseMarks`, userversemark, {
        headers: LoginService.getHeaders(),
      })
      .toPromise();
  }
  async destroy(userversemark: UserVerseMark): Promise<Responser> {
    console.log(`${environment.API2}/userVerseMarks/${userversemark.id}`);
    return this.http
      .delete<Responser>(
        `${environment.API2}/userVerseMarks/${userversemark.id}`,
        {
          headers: LoginService.getHeaders(),
        }
      )
      .toPromise();
  }
}
