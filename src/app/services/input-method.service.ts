import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Responser } from '../models/responser';
import { ExceptionService } from './exception-service.service';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root',
})
export class InputMethodService {
  constructor(
    protected http: HttpClient,
    protected exceptionService: ExceptionService
  ) {}

  async get(): Promise<Responser> {
    return this.http
      .get<Responser>(`${environment.API}/inputMethod`, {
        headers: LoginService.getHeaders(),
      })
      .toPromise();
  }
}
