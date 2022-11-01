export class UserFilter {
  role: string;
  email: string;
  birthDay: string;
  name: string;
  ativo: number;
  page: number;
  size: number;

  constructor(role: string = 'customer') {
    this.page = 0;
    this.size = null;
    this.ativo = 1;
    this.role = role;
    this.birthDay = null;
    this.name = null;
  }
  getRequest() {
    let request = '';
    if (this.size) {
      request += 'page=' + this.page + '&size=' + this.size;
    }
    if (this.name) {
      request += 'name=' + this.name;
    }

    if (this.birthDay) {
      if (request.length > 0) {
        request += '&';
      }
      request += 'birthDay=' + this.birthDay;
    }
    if (this.ativo) {
      if (request.length > 0) {
        request += '&';
      }
      request += 'ativo=' + this.ativo;
    }

    // if (this.role) {
    //   if (request.length > 0) {
    //     request += '&';
    //   }
    //   request += 'role=' + this.role;
    // }
    return request;
  }
}
