/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/naming-convention */
import { Responser } from '../models/responser';
import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ExceptionService } from './exception-service.service';
import { DataToken, TokenAccess } from '../models/token';
import { User } from '../models/user';
import { UiService } from './ui.service';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(
    private http: HttpClient,
    public exceptionService: ExceptionService
  ) {}
  public static httpHeaders = new HttpHeaders();
  public credEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();

  public static setToken(token) {
    if (token) {
      UiService.localSet('token', token);
    }
  }

  public static getToken(): DataToken {
    return UiService.localGet('token');
  }

  public static getUser(): User {
    return LoginService.getToken().user;
  }
  public static updateUserToken(user: User, reload: boolean = false) {
    const token = LoginService.getToken();
    token.user = user;
    LoginService.setToken(token);
    if (reload) {
      window.location.reload();
    }
  }

  public static getHeaders(formData?: boolean): HttpHeaders {
    const token = LoginService.getToken();
    if (token) {
      let httpHeaders = new HttpHeaders();
      if (formData) {
        httpHeaders = new HttpHeaders({
          Authorization: 'Bearer ' + token.token,
        });
      } else {
        httpHeaders = new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token.token,
        });
      }
      return httpHeaders;
    }

    return null;
  }

  async checkLogged(): Promise<boolean> {
    try {
      const user = await this.loggedUser();

      if (user) {
        return Promise.resolve(true);
      }
    } catch (e) {
      return Promise.resolve(false);
    }
  }

  async delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async login(login: string, senha: string = ''): Promise<TokenAccess> {
    return this.http
      .post<TokenAccess>(`${environment.API}/auth/login`, {
        email: login,
        password: senha,
      })
      .toPromise();
  }

  loggedUser(): Promise<Responser> {
    return this.http
      .get<Responser>(`${environment.API2}/auth/loggedUser`, {
        headers: LoginService.getHeaders(),
      })
      .toPromise();
  }

  logout(): Promise<Responser> {
    return this.http
      .post<Responser>(
        `${environment.API}/logout`,
        {},
        { headers: LoginService.getHeaders() }
      )
      .toPromise();
  }

  checkCod(cod: string): Promise<Responser> {
    return this.http
      .post<Responser>(
        `${environment.API}/auth/codeValidation/`,
        { cod },
        {
          headers: LoginService.getHeaders(),
        }
      )
      .toPromise();
  }

  recoverAccess(email: string): Promise<any> {
    return this.http
      .post(`${environment.API}/auth/recoverAccess/`, { email })
      .toPromise();
  }

  updatePassword(user: User): Promise<Responser> {
    return this.http
      .patch<Responser>(
        `${environment.API}/auth/updatePassword/user/${user.id}`,
        user
      )
      .toPromise();
  }

  sendInvitation(email: string): Promise<Responser> {
    if (!LoginService.getHeaders()) {
      this.checkLogged();
      return Promise.resolve(null);
    }

    return this.http
      .post<Responser>(`${environment.API2}/auth/sendInvitation/`, { email })
      .toPromise();
  }

  async validCod(code: string, is_invitation: boolean): Promise<Responser> {
    return this.http
      .post<Responser>(`${environment.API}/auth/codeRescue`, {
        code,
        isInvitation: is_invitation,
      })
      .toPromise();
  }
}
