/* eslint-disable @typescript-eslint/no-unused-expressions */
import { Constants } from './constants';
/* eslint-disable @typescript-eslint/naming-convention */
import { Contact } from './contact';

export class User {
  id: number;
  name: string;
  email: string;
  isFidelity: boolean;
  birthDate: string;
  contact: Contact;
  created_at: string;
  updated_at: string;
  roles: string[];
  usingCredit: boolean;
  goal: number;
  password: string;
  policy: boolean;
  image: string;
  occupation: string;
  constructor(roles: string[] = [], name: string = '', email: string = '') {
    if (roles.length === 0) {
      roles.push[Constants.ROLE_MEMBER];
    }
    this.name = name;
    this.email = email;
    this.roles = roles;
    this.contact = new Contact();
    this.goal = 0;
  }
}
