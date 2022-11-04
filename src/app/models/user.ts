import { InputMethod } from './inputhMethod';
/* eslint-disable @typescript-eslint/no-unused-expressions */
import { Constants } from './constants';
/* eslint-disable @typescript-eslint/naming-convention */
import { Contact } from './contact';
import { MaritalStatus } from './maritalStatus';

export class User {
  id: number;
  name: string;
  email: string;
  isBaptized: boolean;
  birthDate: string;
  contact: Contact;
  role: string;
  password: string;
  policy: boolean;
  image: string;
  occupation: string;
  gender: string;
  maritalStatus: MaritalStatus;
  inputMethod: InputMethod;

  constructor(name: string = '', email: string = '') {
    this.role = Constants.ROLE_MEMBER;
    this.name = name;
    this.email = email;
    this.contact = new Contact();
    this.isBaptized = false;
    this.maritalStatus = new MaritalStatus();
    this.inputMethod = new InputMethod();
  }
}
