/* eslint-disable max-len */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ChallengeQuiz } from '../models/challengeQuiz';
import { ChallengeSuggestion } from '../models/challengeSuggestion';
import { Responser } from '../models/responser';
import { ExceptionService } from './exception-service.service';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root',
})
export class ChallengeQuizSuggestionService {
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

  async store(
    challengeSuggestion: ChallengeSuggestion,
    quiz: ChallengeQuiz
  ): Promise<Responser> {
    if (!(await LoginService.getHeaders())) {
      this.checkLogged();
      return Promise.resolve(null);
    }
    challengeSuggestion.user = LoginService.getUser();
    return this.http
      .post<Responser>(
        `${environment.API2}/challengeSuggestion/quiz/${quiz.id}`,
        challengeSuggestion,
        {
          headers: await LoginService.getHeaders(),
        }
      )
      .toPromise();
  }

  async makeNewChallengeWeek(
    challengeSuggestion: ChallengeSuggestion,
    challengeQuiz: ChallengeQuiz
  ): Promise<Responser> {
    if (!(await LoginService.getHeaders())) {
      this.checkLogged();
      return Promise.resolve(null);
    }
    return this.http
      .get<Responser>(
        `${environment.API2}/challengeSuggestion/makeNewChallengeWeek/${challengeSuggestion.id}/challengeQuiz/${challengeQuiz.id}`,
        {
          headers: await LoginService.getHeaders(),
        }
      )
      .toPromise();
  }

  async update(challengeSuggestion: ChallengeSuggestion): Promise<Responser> {
    if (!(await LoginService.getHeaders())) {
      this.checkLogged();
      return Promise.resolve(null);
    }

    return this.http
      .patch<Responser>(
        `${environment.API2}/challengeSuggestion/${challengeSuggestion.id}`,
        challengeSuggestion,
        {
          headers: await LoginService.getHeaders(),
        }
      )
      .toPromise();
  }

  async destroy(challengeSuggestion: ChallengeSuggestion) {
    if (!(await LoginService.getHeaders())) {
      this.checkLogged();
      return Promise.resolve(null);
    }
    return this.http
      .delete(
        `${environment.API2}/challengeSuggestion/${challengeSuggestion.id}`,
        {
          headers: await LoginService.getHeaders(),
        }
      )
      .toPromise();
  }
}
