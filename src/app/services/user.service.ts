import { ServiceInterface } from './serviceInterface';
import { Responser } from './../models/responser';
import { UserFilter } from '../models/userFilter';
/* eslint-disable @typescript-eslint/member-ordering */
import { ExceptionService } from 'src/app/services/exception-service.service';
import { LoginService } from './login.service';

import { User } from '../models/user';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService extends ServiceInterface {
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

  async get(filter: UserFilter = new UserFilter()): Promise<Responser> {
    if (!(await LoginService.getHeaders())) {
      this.checkLogged();
      return Promise.resolve(null);
    }

    console.log(filter);
    console.log(`${environment.API2}/users?${UserFilter.getRequest(filter)}`);
    return this.http
      .get<Responser>(
        `${environment.API2}/users?${UserFilter.getRequest(filter)}`,
        {
          headers: LoginService.getHeaders(),
        }
      )
      .toPromise();
  }

  async getUserById(id: number): Promise<User> {
    if (!(await LoginService.getHeaders())) {
      this.checkLogged();
      return Promise.resolve(null);
    }
    return this.http
      .get<User>(`${environment.API2}/users/${id}`, {
        headers: LoginService.getHeaders(),
      })
      .toPromise();
  }

  async store(user: User): Promise<Responser> {
    console.log(JSON.stringify(user));
    return this.http
      .post<Responser>(`${environment.API}/users`, user, {
        headers: LoginService.getHeaders(),
      })
      .toPromise();
  }

  async update(user: User): Promise<Responser> {
    if (!(await LoginService.getHeaders())) {
      this.checkLogged();
      return Promise.resolve(null);
    }
    console.log(JSON.stringify(user));
    return this.http
      .patch<Responser>(`${environment.API2}/users/${user.id}`, user, {
        headers: LoginService.getHeaders(),
      })
      .toPromise();
  }

  async delete(user: User): Promise<Responser> {
    if (!(await LoginService.getHeaders())) {
      this.checkLogged();
      return Promise.resolve(null);
    }
    return this.http
      .delete<Responser>(`${environment.API2}/users/${user.id}`, {
        headers: LoginService.getHeaders(),
      })
      .toPromise();
  }

  alterarSenha(user: User, senha: string) {
    return this.http
      .get(`${environment.API}/users/updateSenha/${user.id}/${senha}`)
      .toPromise();
  }

  async upload(formData: FormData, user: User): Promise<User> {
    if (!(await LoginService.getHeaders())) {
      this.checkLogged();
      return Promise.resolve(null);
    }
    return this.http
      .post<User>(`${environment.API2}/users/${user.id}/upload`, formData, {
        headers: await LoginService.getHeaders(true),
      })
      .toPromise();
  }

  async newUser(user: User): Promise<User> {
    if (!(await LoginService.getHeaders())) {
      this.checkLogged();
      return Promise.resolve(null);
    }
    return this.http
      .post<User>(`${environment.API}/users/new`, user, {})
      .toPromise();
  }

  consultaCep(cep: string): Promise<any> {
    return this.http.get<any>(`${environment.API}/cep/${cep}`).toPromise();
  }

  async deleteImage(user: User): Promise<User> {
    if (!(await LoginService.getHeaders())) {
      this.checkLogged();
      return Promise.resolve(null);
    }
    return this.http
      .delete<User>(
        `${environment.API2}/users/image/${user.id}/${user.image}`,
        {
          headers: await LoginService.getHeaders(),
        }
      )
      .toPromise();
  }
}
