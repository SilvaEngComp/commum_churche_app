import { User } from './User';

export class TitheFilter {
  amount: number;
  isTithe: boolean;
  month: string;
  year: string;
  user: User;

  constructor() {}
  static getRequest(filter: TitheFilter): string {
    let request = '?';
    if (filter.amount) {
      if (request.length > 0) {
        request += '&';
      }
      request += 'amount=' + filter.amount;
    }
    if (filter.month) {
      if (request.length > 0) {
        request += '&';
      }
      request += 'month=' + filter.month;
    }
    if (filter.year) {
      if (request.length > 0) {
        request += '&';
      }
      request += 'year=' + filter.year;
    }
    if (filter.isTithe) {
      if (request.length > 0) {
        request += '&';
      }
      request += 'isTithe=' + filter.isTithe;
    }
    if (filter.user) {
      if (request.length > 0) {
        request += '&';
      }
      request += 'user_id=' + filter.user?.id;
    }

    if (request === '?') {
      request = '';
    }
    return request;
  }
}
