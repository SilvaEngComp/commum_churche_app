import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Responser } from '../models/responser';
import { Wallet } from '../models/wallet';
import { ExceptionService } from './exception-service.service';
import { LoginService } from './login.service';
import { ServiceInterface } from './serviceInterface';

@Injectable({
  providedIn: 'root',
})
export class WalletService extends ServiceInterface {
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
      .get<Responser>(`${environment.API2}/wallets`, {
        headers: LoginService.getHeaders(),
      })
      .toPromise();
  }

  async store(wallet: Wallet): Promise<Responser> {
    if (!(await LoginService.getHeaders())) {
      this.checkLogged();
      return Promise.resolve(null);
    }

    console.log(JSON.stringify(wallet));
    return this.http
      .post<Responser>(`${environment.API2}/wallets`, wallet, {
        headers: LoginService.getHeaders(),
      })
      .toPromise();
  }

  async update(wallet: Wallet): Promise<Responser> {
    if (!(await LoginService.getHeaders())) {
      this.checkLogged();
      return Promise.resolve(null);
    }

    return this.http
      .patch<Responser>(`${environment.API2}/wallets/${wallet.id}`, wallet, {
        headers: LoginService.getHeaders(),
      })
      .toPromise();
  }

  async delete(wallet: Wallet): Promise<Responser> {
    if (!(await LoginService.getHeaders())) {
      this.checkLogged();
      return Promise.resolve(null);
    }

    return this.http
      .delete<Responser>(`${environment.API2}/walletCategories/${wallet?.id}`, {
        headers: LoginService.getHeaders(),
      })
      .toPromise();
  }
}
