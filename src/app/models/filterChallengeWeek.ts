
export class FilterChallengeWeek {
  orderDesc: boolean;
  year: number;
  constructor() {
    this.orderDesc = true;
    this.year = new Date().getFullYear();
  }

  getRequest() {
    let request = '';

    if (this.year) {
      request += '?year=' + this.year;
    }
    return request;
  }
}
