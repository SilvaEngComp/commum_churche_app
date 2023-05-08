/* eslint-disable @typescript-eslint/member-ordering */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Feed } from '../models/feed';
import { FilterFeed } from '../models/filterFeed';
import { Responser } from '../models/responser';
import { ExceptionService } from './exception-service.service';
import { LoginService } from './login.service';
import { ServiceInterface } from './serviceInterface';

@Injectable({
  providedIn: 'root',
})
export class FeedService extends ServiceInterface {
  constructor(
    protected http: HttpClient,
    protected exceptionService: ExceptionService
  ) {
    super(http, exceptionService);
  }
  checkLogged() {
    this.exceptionService.alertDialog(
      'Infelizmente sua conexão expirou. Saia e faça login novamente',
      'CONEXÃO EXPIRADA',
      true
    );
  }

  async get(filter: FilterFeed): Promise<Responser> {
    if (!(await LoginService.getHeaders())) {
      this.checkLogged();
      return Promise.resolve(null);
    }

    console.clear();
    console.log(`${environment.API2}/feeds${filter.getRequest()}`);
    return this.http
      .get<Responser>(`${environment.API2}/feeds${filter.getRequest()}`, {
        headers: await LoginService.getHeaders(),
      })
      .toPromise();
  }
  async checkNewest(): Promise<Responser> {
    if (!(await LoginService.getHeaders())) {
      this.checkLogged();
      return Promise.resolve(null);
    }
    return this.http
      .get<Responser>(`${environment.API2}/feeds/newest`, {
        headers: await LoginService.getHeaders(),
      })
      .toPromise();
  }

  async hasSawNewest() {
    if (!(await LoginService.getHeaders())) {
      this.checkLogged();
      return Promise.resolve(null);
    }
    const user = LoginService.getUser();

    console.clear();
    console.log(`${environment.API2}/feeds/hasSawNewest/${user.id}`);
    return this.http
      .get(`${environment.API2}/feeds/hasSawNewest/${user.id}`, {
        headers: await LoginService.getHeaders(),
      })
      .toPromise();
  }
  async store(feed: Feed): Promise<Responser> {
    if (!(await LoginService.getHeaders())) {
      this.checkLogged();
      return Promise.resolve(null);
    }
    console.clear();
    console.log(JSON.stringify(feed));
    return this.http
      .post<Responser>(`${environment.API2}/feeds`, feed, {
        headers: await LoginService.getHeaders(),
      })
      .toPromise();
  }
  async upload(formData: FormData, feed: Feed): Promise<Responser> {
    if (!(await LoginService.getHeaders())) {
      this.checkLogged();
      return Promise.resolve(null);
    }
    return this.http
      .post<Responser>(
        `${environment.API2}/feeds/${feed.id}/upload`,
        formData,
        {
          headers: await LoginService.getHeaders(true),
        }
      )
      .toPromise();
  }
  async store2(formData: FormData): Promise<Responser> {
    if (!(await LoginService.getHeaders())) {
      this.checkLogged();
      return Promise.resolve(null);
    }
    console.log(JSON.stringify(formData.getAll('feed')));
    return this.http
      .post<Responser>(`${environment.API2}/feeds`, formData, {
        headers: await LoginService.getHeaders(true),
      })
      .toPromise();
  }

  async publishFeed(feed: Feed, publish: boolean) {
    if (!(await LoginService.getHeaders())) {
      this.checkLogged();
      return Promise.resolve(null);
    }
    return this.http
      .get(`${environment.API2}/feeds/${feed.id}/publish/${publish}`, {
        headers: await LoginService.getHeaders(),
      })
      .toPromise();
  }

  async update(feed: Feed): Promise<Responser> {
    if (!(await LoginService.getHeaders())) {
      this.checkLogged();
      return Promise.resolve(null);
    }
    console.clear();
    console.log(JSON.stringify(feed));
    return this.http
      .patch<Responser>(`${environment.API2}/feeds/${feed.id}`, feed, {
        headers: await LoginService.getHeaders(),
      })
      .toPromise();
  }

  async destroy(feed: Feed): Promise<Responser> {
    if (!(await LoginService.getHeaders())) {
      this.checkLogged();
      return Promise.resolve(null);
    }
    return this.http
      .delete<Responser>(`${environment.API2}/feeds/${feed.id}`, {
        headers: await LoginService.getHeaders(),
      })
      .toPromise();
  }
}
