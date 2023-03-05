/* eslint-disable @typescript-eslint/naming-convention */
import { User } from './User';
import { Wallet } from './wallet';

export class FinancySummaryFilter {
  amount: number;
  isTithe: boolean;
  month: string;
  year: string;
  user: User;
  dateI: string;
  dateF: string;
  wallet_id: number;

  constructor() {}
  static getRequest(filter: FinancySummaryFilter): string {
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
    if (filter.dateI) {
      if (request.length > 0) {
        request += '&';
      }
      request += 'dateI=' + filter.dateI;
    }
    if (filter.dateF) {
      if (request.length > 0) {
        request += '&';
      }
      request += 'dateF=' + filter.dateF;
    }
    if (filter.wallet_id) {
      if (request.length > 0) {
        request += '&';
      }
      request += 'wallet_id=' + filter.wallet_id;
    }

    return request;
  }
}
