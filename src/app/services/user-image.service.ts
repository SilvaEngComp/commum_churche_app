/* eslint-disable @typescript-eslint/member-ordering */
import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { Responser } from '../objects/responser';
import { User } from '../objects/User';
import { ExceptionService } from './exception-service.service';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class UserImageService {

  constructor(
    private exceptionService: ExceptionService,
    private http: HttpClient) { }

  @Output()
  public static userEmitter: EventEmitter<User> = new EventEmitter<User>();
  buscaUser(name: string, usuarios: User[]) {
    name = name.toLocaleLowerCase();
    return usuarios.filter((cliente) => cliente.name.toLowerCase().includes(name.toLowerCase()));
  }



  checkLogged() {
    this.exceptionService.alertDialog(
      'Infelizmente sua conexão expirou. Saia e faça login novamente',
      'CONEXÃO EXPIRADA',
      true
    );
  }


  async upload(formData: FormData): Promise<Responser> {
    if (!(await LoginService.getHeaders())) {
      this.checkLogged();
      return Promise.resolve(null);
    }
    const user = LoginService.getUser();
    return this.http
      .post<Responser>(`${environment.API2}/usersImage/${user.id}`, formData, {
        headers: await LoginService.getHeaders(true),
      })
      .toPromise();
  }

  async deleteImage(user: User): Promise<Responser> {
    if (!(await LoginService.getHeaders())) {
      this.checkLogged();
      return Promise.resolve(null);
    }
    return this.http
      .delete<Responser>(
        `${environment.API2}/usersImage/${user.id}`,
        {
          headers: await LoginService.getHeaders(),
        }
      )
      .toPromise();
  }

}
