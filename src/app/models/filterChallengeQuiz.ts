
export class FilterChallengeQuiz {
  orderDesc: boolean;
  status: boolean;
  constructor(status?: boolean) {
    this.orderDesc = true;

    this.status = status;
  }

  getRequest() {
    let request = '?orderDesc=' + this.orderDesc;


    if (this.status) {
      request += '&status=' + this.status;
    }

    return request;

  }
}
