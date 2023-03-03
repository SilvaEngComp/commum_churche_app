import { CaixaCategory } from './caixaCategory';
import { Church } from './church';
import { User } from './User';

export class CaixaFilter {
  amount: number;
  isEntry: boolean;
  month: string;
  year: string;
  user: User;
  church: Church;
  caixaCategory: CaixaCategory;

  constructor() {}
  static getRequest(filter: CaixaFilter): string {
    let request = '';
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
    if (filter.isEntry) {
      if (request.length > 0) {
        request += '&';
      }
      request += 'isEntry=' + filter.isEntry;
    }
    if (filter.user) {
      if (request.length > 0) {
        request += '&';
      }
      request += 'user_id=' + filter.user?.id;
    }

    return request;
  }
}
