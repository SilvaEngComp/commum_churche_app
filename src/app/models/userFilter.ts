import { InputMethod } from './inputhMethod';
import { MaritalStatus } from './maritalStatus';
import { Church } from './church';
export class UserFilter {
  role: string;
  email: string;
  birthdayMonth: string;
  name: string;
  isActive: number;
  church: Church;
  inputMethod: InputMethod;
  maritalStatus: MaritalStatus;
  gender: string;
  isBaptized: number;

  constructor() {}
  static getRequest(filter: UserFilter): string {
    let request = '';
    if (filter.birthdayMonth) {
      if (request.length > 0) {
        request += '&';
      }
      request += 'birthdayMonth=' + filter.birthdayMonth;
    }
    if (filter.isActive) {
      if (request.length > 0) {
        request += '&';
      }
      request += 'isActive=' + filter.isActive;
    }

    if (filter.role) {
      if (request.length > 0) {
        request += '&';
      }
      request += 'role=' + filter.role;
    }
    if (filter.church) {
      if (request.length > 0) {
        request += '&';
      }
      request += 'church=' + filter.church?.id;
    }

    if (filter.inputMethod) {
      if (request.length > 0) {
        request += '&';
      }
      request += 'inputMethod=' + filter.inputMethod?.id;
    }
    if (filter.maritalStatus) {
      if (request.length > 0) {
        request += '&';
      }
      request += 'maritalStatus=' + filter.maritalStatus?.id;
    }
    if (filter.gender) {
      if (request.length > 0) {
        request += '&';
      }
      request += 'gender=' + filter.gender;
    }
    if (filter.isBaptized) {
      if (request.length > 0) {
        request += '&';
      }
      request += 'isBaptized=' + filter.isBaptized;
    }
    return request;
  }
}
