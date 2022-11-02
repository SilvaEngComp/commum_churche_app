import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ChallengeMonth } from '../models/challengeMonth';
import { ChallengeWeek } from '../models/challengeWeek';
import { FilterChallengeWeek } from '../models/filterChallengeWeek';
import { Responser } from '../models/responser';
import { ExceptionService } from './exception-service.service';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root',
})
export class ChallengeService {
  constructor(
    private http: HttpClient,
    private exceptionService: ExceptionService
  ) {}
  checkLogged() {
    this.exceptionService.alertDialog(
      'Infelizmente sua conexão expirou. Saia e faça login novamente',
      'CONEXÃO EXPIRADA',
      true
    );
  }

  async get(
    filter: FilterChallengeWeek = new FilterChallengeWeek()
  ): Promise<ChallengeMonth[]> {
    if (!(await LoginService.getHeaders())) {
      this.checkLogged();
      return Promise.resolve(null);
    }
    return this.http
      .get<ChallengeMonth[]>(
        `${environment.API2}/challenges${filter.getRequest()}`,
        {
          headers: await LoginService.getHeaders(),
        }
      )
      .toPromise();
  }
  async store(challenge: ChallengeWeek): Promise<ChallengeMonth[]> {
    if (!(await LoginService.getHeaders())) {
      this.checkLogged();
      return Promise.resolve(null);
    }

    return this.http
      .post<ChallengeMonth[]>(`${environment.API2}/challenges`, challenge, {
        headers: await LoginService.getHeaders(),
      })
      .toPromise();
  }

  async setAsDone(challenge: ChallengeWeek): Promise<Responser> {
    if (!(await LoginService.getHeaders())) {
      this.checkLogged();
      return Promise.resolve(null);
    }
    const user = LoginService.getUser();
    return this.http
      .get<Responser>(
        `${environment.API2}/challengeUser/challenge/${challenge.id}/user/${user.id}`,
        {
          headers: await LoginService.getHeaders(),
        }
      )
      .toPromise();
  }

  async update(challenge: ChallengeWeek) {
    if (!(await LoginService.getHeaders())) {
      this.checkLogged();
      return Promise.resolve(null);
    }
    return this.http
      .patch(`${environment.API2}/challenges/${challenge.id}`, challenge, {
        headers: await LoginService.getHeaders(),
      })
      .toPromise();
  }

  async destroy(challenge: ChallengeWeek): Promise<ChallengeWeek[]> {
    if (!(await LoginService.getHeaders())) {
      this.checkLogged();
      return Promise.resolve(null);
    }
    return this.http
      .delete<ChallengeWeek[]>(
        `${environment.API2}/challenges/${challenge.id}`,
        {
          headers: await LoginService.getHeaders(),
        }
      )
      .toPromise();
  }
}
