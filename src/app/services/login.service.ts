/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/naming-convention */
import { Responser } from '../models/responser';
import { AlertController, ModalController } from '@ionic/angular';
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
      .get<Responser>(`${environment.API2}/loggedUser`, {
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
      .get<Responser>(`${environment.API}/users/virificarcodigo/${cod}`, {
        headers: LoginService.getHeaders(),
      })
      .toPromise();
  }

  esqueciSenha(email: string): Promise<any> {
    return this.http
      .get(`${environment.API}/users/esqueciSenha/${email}`)
      .toPromise();
  }
  alterarSenha(user: User, senha: string): Promise<User> {
    return this.http
      .get<User>(`${environment.API}/users/updateSenha/${user.id}/${senha}`)
      .toPromise();
  }
}
