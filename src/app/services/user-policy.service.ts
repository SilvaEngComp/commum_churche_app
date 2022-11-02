/* eslint-disable @typescript-eslint/member-ordering */
import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { User } from '../models/User';
import { ExceptionService } from './exception-service.service';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root',
})
export class UserPolicyService {
  constructor(
    private exceptionService: ExceptionService,
    private http: HttpClient,
    private modalCtrl: ModalController
  ) {}

  @Output()
  public static userEmitter: EventEmitter<User> = new EventEmitter<User>();
  buscaUser(name: string, usuarios: User[]) {
    name = name.toLocaleLowerCase();
    return usuarios.filter((cliente) =>
      cliente.name.toLowerCase().includes(name.toLowerCase())
    );
  }

  checkLogged() {
    this.exceptionService.alertDialog(
      'Infelizmente sua conexão expirou. Saia e faça login novamente',
      'CONEXÃO EXPIRADA',
      true
    );
  }

  async updatePolicy(user: User): Promise<User> {
    if (!this.checkLogged) {
      return Promise.resolve(null);
    }
    return this.http
      .patch<User>(`${environment.API2}/users/policy/${user.id}`, user, {
        headers: await LoginService.getHeaders(),
      })
      .toPromise();
  }

  public getPolicy(): Promise<any> {
    return this.http.get(`${environment.API}/users/policy`).toPromise();
  }
}
