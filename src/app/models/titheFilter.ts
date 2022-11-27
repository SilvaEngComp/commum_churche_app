export class TitheFilter {
  amount: number;
  isTithe: boolean;
  month: number;

  constructor() {}
  static getRequest(filter: TitheFilter): string {
    let request = '';
    if (filter.amount) {
      if (request.length > 0) {
        request += '&';
      }
      request += 'amount=' + filter.amount;
    }
    if (filter.isTithe) {
      if (request.length > 0) {
        request += '&';
      }
      request += 'isTithe=' + filter.isTithe;
    }

    return request;
  }
}
