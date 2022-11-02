
export class FilterFeed {
  orderDesc: boolean;

  constructor() {
    this.orderDesc = true;
  }

  getRequest() {
    const request = '?orderDesc=' + this.orderDesc;

    return request;
  }
}
