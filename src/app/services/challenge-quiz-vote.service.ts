/* eslint-disable max-len */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ChallengeQuiz } from '../models/challengeQuiz';
import { ExceptionService } from './exception-service.service';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root',
})
export class ChallengeQuizVoteService {
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

  async store(vote: number, quiz: ChallengeQuiz) {
    if (!(await LoginService.getHeaders())) {
      this.checkLogged();
      return Promise.resolve(null);
    }

    return this.http
      .post(
        `${environment.API2}/challengeQuizUserVote/challengeQuiz/${quiz.id}/challengeSuggestion/${vote}`,
        {},
        {
          headers: await LoginService.getHeaders(),
        }
      )
      .toPromise();
  }

  async update(vote: number, quiz: ChallengeQuiz) {
    if (!(await LoginService.getHeaders())) {
      this.checkLogged();
      return Promise.resolve(null);
    }

    return this.http
      .patch(
        `${environment.API2}/challengeQuizUserVote/${quiz.challengeQuizUserVote.id}/challengeSuggestion/${vote}`,
        {},
        {
          headers: await LoginService.getHeaders(),
        }
      )
      .toPromise();
  }

  async destroy(challengeQuizVote: ChallengeQuiz) {
    if (!(await LoginService.getHeaders())) {
      this.checkLogged();
      return Promise.resolve(null);
    }
    return this.http
      .delete(
        `${environment.API2}/challengeQuizUserVote/${challengeQuizVote.challengeQuizUserVote.id}`,
        {
          headers: await LoginService.getHeaders(),
        }
      )
      .toPromise();
  }
}
