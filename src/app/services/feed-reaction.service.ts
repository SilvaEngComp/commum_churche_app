import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Feed } from '../models/feed';
import { FeedComment } from '../models/feedReaction';
import { Responser } from '../models/responser';
import { ExceptionService } from './exception-service.service';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root',
})
export class FeedCommentService {
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

  async get(feed: Feed): Promise<FeedComment[]> {
    if (!(await LoginService.getHeaders())) {
      this.checkLogged();
      return Promise.resolve(null);
    }
    return this.http
      .get<FeedComment[]>(`${environment.API2}/feedComments/feed/${feed.id}`, {
        headers: await LoginService.getHeaders(),
      })
      .toPromise();
  }

  async store(feedReaction: FeedComment, feed: Feed): Promise<Responser> {
    if (!(await LoginService.getHeaders())) {
      this.checkLogged();
      return Promise.resolve(null);
    }
    console.log(JSON.stringify(feedReaction));
    const user = LoginService.getToken().user;
    return this.http
      .post<Responser>(
        `${environment.API2}/feedComments/feed/${feed.id}/user/${user.id}`,
        feedReaction,
        {
          headers: await LoginService.getHeaders(),
        }
      )
      .toPromise();
  }

  async setLove(feed: Feed): Promise<Responser> {
    if (!(await LoginService.getHeaders())) {
      this.checkLogged();
      return Promise.resolve(null);
    }
    const user = LoginService.getUser();
    return this.http
      .get<Responser>(
        `${environment.API2}/feedReactionsLove/feed/${feed.id}/user/${user.id}`,
        {
          headers: await LoginService.getHeaders(),
        }
      )
      .toPromise();
  }

  async update(feedReaction: FeedComment): Promise<Responser> {
    if (!(await LoginService.getHeaders())) {
      this.checkLogged();
      return Promise.resolve(null);
    }
    console.log(JSON.stringify(feedReaction));
    return this.http
      .patch<Responser>(
        `${environment.API2}/feedComments/${feedReaction.id}`,
        feedReaction,
        {
          headers: await LoginService.getHeaders(),
        }
      )
      .toPromise();
  }

  async destroy(feedReaction: FeedComment): Promise<Responser> {
    if (!(await LoginService.getHeaders())) {
      this.checkLogged();
      return Promise.resolve(null);
    }
    return this.http
      .delete<Responser>(
        `${environment.API2}/feedComments/${feedReaction.id}`,
        {
          headers: await LoginService.getHeaders(),
        }
      )
      .toPromise();
  }
}
