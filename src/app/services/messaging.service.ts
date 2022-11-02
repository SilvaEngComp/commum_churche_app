/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/member-ordering */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { LoginService } from './login.service';
import { AngularFireMessaging } from '@angular/fire/compat/messaging';
import { PushNotify } from '../models/pushNotification';
import { User } from '../models/User';
import { ExceptionService } from './exception-service.service';

@Injectable({
  providedIn: 'root',
})
export class MessagingService {
  constructor(
    private afMessaging: AngularFireMessaging,
    private exceptionService: ExceptionService,
    private http: HttpClient
  ) {}

  checkLogged() {
    this.exceptionService.alertDialog(
      'Infelizmente sua conexão expirou. Saia e faça login novamente',
      'CONEXÃO EXPIRADA',
      true
    );
  }

  token = null;
  requestPermission() {
    return this.afMessaging.requestToken.pipe(
      tap((token) =>
        this.store(token, 1).then((user) => {
          const token = LoginService.getToken();
          token.user = user;
          LoginService.setToken(token);
        })
      )
    );
  }

  getMessages() {
    return this.afMessaging.messages;
  }

  deleteToken() {
    if (this.token) {
      this.afMessaging.deleteToken(this.token);
      this.token = null;
    }
  }

  async store(token: string, op: number): Promise<User> {
    if (!(await LoginService.getHeaders())) {
      this.checkLogged();
      return Promise.resolve(null);
    }
    let object;
    if (op === 1) {
      object = { fcm_web_key: token };
    } else {
      object = { fcm_mobile_key: token };
    }
    const user = LoginService.getToken().user;
    return this.http
      .post<User>(
        `${environment.API2}/pushNotifications/user/${user.id}`,
        object,
        {
          headers: LoginService.getHeaders(),
        }
      )
      .toPromise();
  }

  async send(push: PushNotify): Promise<User> {
    console.log(JSON.stringify(push));
    return this.http
      .post<User>(`${environment.API2}/pushNotifications/send`, push, {
        headers: LoginService.getHeaders(),
      })
      .toPromise();
  }
}
