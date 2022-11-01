import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Tutorial } from '../models/tutorial';
import { ExceptionService } from './exception-service.service';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class TutorialService {

  constructor(
    private loginService: LoginService,
    private exceptionService: ExceptionService,
    private http: HttpClient,
  ) {

  }


 checkLogged() {
    this.exceptionService.alertDialog(
      'Infelizmente sua conexão expirou. Saia e faça login novamente',
      'CONEXÃO EXPIRADA',
      true
    );
  }
  async get(): Promise<Tutorial[]> {
       if (!(await LoginService.getHeaders())) {
      this.checkLogged();
      return Promise.resolve(null);
    }

       const token = LoginService.getToken();

    return this.http.get<Tutorial[]>(`${environment.API2}/tutorials`,
      { headers: LoginService.getHeaders() }).toPromise();
  }

  async store(formData: FormData): Promise<Tutorial> {
       if (!(await LoginService.getHeaders())) {
      this.checkLogged();
      return Promise.resolve(null);
       }

    return this.http.post<Tutorial>(`${environment.API2}/tutorials`, formData,
    { headers:  LoginService.getHeaders(true) }).toPromise();

  }

  async update(tutorial: Tutorial): Promise<Tutorial> {
      if (!(await LoginService.getHeaders())) {
      this.checkLogged();
      return Promise.resolve(null);
    }

    // console.log(tutorial)
    // console.log(JSON.stringify(tutorial))
    return this.http.patch<Tutorial>(`${environment.API2}/tutorials/${tutorial.id}`, tutorial,
      { headers: LoginService.getHeaders() }).toPromise();
  }

  async delete(tutorial: Tutorial): Promise<Tutorial[]> {
        if (!(await LoginService.getHeaders())) {
      this.checkLogged();
      return Promise.resolve(null);
    }

    return this.http.delete<Tutorial[]>(`${environment.API2}/tutorials/${tutorial.id}`,
      { headers: LoginService.getHeaders() }).toPromise();
  }

}
