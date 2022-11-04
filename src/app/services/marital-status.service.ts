import { Responser } from './../models/responser';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ExceptionService } from './exception-service.service';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root',
})
export class MaritalStatusService {
  constructor(
    protected http: HttpClient,
    protected exceptionService: ExceptionService
  ) {}

  async get(): Promise<Responser> {
    return this.http
      .get<Responser>(`${environment.API}/maritalStatus`, {
        headers: LoginService.getHeaders(),
      })
      .toPromise();
  }
}
