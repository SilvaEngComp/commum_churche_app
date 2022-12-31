import { Platform } from '@ionic/angular';
import { Responser } from './../models/responser';
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
import { ExceptionService } from './exception-service.service';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root',
})
export class MessagingService {
  constructor(
    private afMessaging: AngularFireMessaging,
    private exceptionService: ExceptionService,
    private platform: Platform,

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
      tap((token) => {
        const user = LoginService.getUser();
        const isSmall = this.platform.width() > 500;
        let option: number;
        let userToken;
        if (isSmall) {
          userToken = user?.fcm_mobile_web_key;
          option = 1;
        } else {
          userToken = user.fcm_web_key;
          option = 2;
        }
        if (userToken !== token) {
          this.store(token, option).then((responser) => {
            if (responser) {
              if (responser?.data) {
                console.clear();
                console.log(responser.data);
                const user: User = responser.data;
                LoginService.updateUserToken(user);
              }
            }
          });
        }
      })
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

  async store(firebaseToken: string, op: number): Promise<Responser> {
    let object;
    if (op === 1) {
      object = { fcm_web_key: firebaseToken };
    } else if (op === 2) {
      object = { fcm_mobile_web_key: firebaseToken };
    } else {
      object = { fcm_mobile_key: firebaseToken };
    }
    const user = LoginService.getUser();

    return this.http
      .post<Responser>(
        `${environment.API2}/pushNotifications/user/${user.id}`,
        object,
        {
          headers: LoginService.getHeaders(),
        }
      )
      .toPromise();
  }

  async send(push: PushNotify): Promise<Responser> {
    console.log(JSON.stringify(push));
    return this.http
      .post<Responser>(`${environment.API2}/pushNotifications/send`, push, {
        headers: LoginService.getHeaders(),
      })
      .toPromise();
  }
}
