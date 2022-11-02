import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ChallengeQuiz } from '../models/challengeQuiz';
import { FilterChallengeQuiz } from '../models/filterChallengeQuiz';
import { ExceptionService } from './exception-service.service';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root',
})
export class ChallengeQuizService {
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
    filter: FilterChallengeQuiz = new FilterChallengeQuiz()
  ): Promise<ChallengeQuiz[]> {
    if (!(await LoginService.getHeaders())) {
      this.checkLogged();
      return Promise.resolve(null);
    }
    return this.http
      .get<ChallengeQuiz[]>(
        `${environment.API2}/challengeQuizzes${filter.getRequest()}`,
        {
          headers: await LoginService.getHeaders(),
        }
      )
      .toPromise();
  }
  async oppenedQuiz(): Promise<ChallengeQuiz> {
    if (!(await LoginService.getHeaders())) {
      this.checkLogged();
      return Promise.resolve(null);
    }
    return this.http
      .get<ChallengeQuiz>(`${environment.API2}/challengeQuizzes/oppenedQuiz`, {
        headers: await LoginService.getHeaders(),
      })
      .toPromise();
  }

  async show(
    filter: FilterChallengeQuiz = new FilterChallengeQuiz()
  ): Promise<ChallengeQuiz> {
    if (!(await LoginService.getHeaders())) {
      this.checkLogged();
      return Promise.resolve(null);
    }
    return this.http
      .get<ChallengeQuiz>(
        `${environment.API2}/challengeQuizzes${filter.getRequest()}`,
        {
          headers: await LoginService.getHeaders(),
        }
      )
      .toPromise();
  }
  async store(): Promise<ChallengeQuiz> {
    if (!(await LoginService.getHeaders())) {
      this.checkLogged();
      return Promise.resolve(null);
    }

    return this.http
      .post<ChallengeQuiz>(
        `${environment.API2}/challengeQuizzes`,
        {},
        {
          headers: await LoginService.getHeaders(),
        }
      )
      .toPromise();
  }
  async upload(
    formData: FormData,
    challenge: ChallengeQuiz
  ): Promise<ChallengeQuiz> {
    if (!(await LoginService.getHeaders())) {
      this.checkLogged();
      return Promise.resolve(null);
    }
    return this.http
      .post<ChallengeQuiz>(
        `${environment.API2}/challengeQuizzes/${challenge.id}/upload`,
        formData,
        {
          headers: await LoginService.getHeaders(true),
        }
      )
      .toPromise();
  }

  async update(challenge: ChallengeQuiz) {
    if (!(await LoginService.getHeaders())) {
      this.checkLogged();
      return Promise.resolve(null);
    }
    return this.http
      .patch(
        `${environment.API2}/challengeQuizzes/${challenge.id}`,
        challenge,
        {
          headers: await LoginService.getHeaders(),
        }
      )
      .toPromise();
  }

  async destroy(challenge: ChallengeQuiz): Promise<ChallengeQuiz[]> {
    if (!(await LoginService.getHeaders())) {
      this.checkLogged();
      return Promise.resolve(null);
    }
    return this.http
      .delete<ChallengeQuiz[]>(
        `${environment.API2}/challengeQuizzes/${challenge.id}`,
        {
          headers: await LoginService.getHeaders(),
        }
      )
      .toPromise();
  }
}
