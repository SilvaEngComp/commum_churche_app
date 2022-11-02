/* eslint-disable @typescript-eslint/naming-convention */
import { Contact } from './contact';

export class User {
  id: number;
  name: string;
  email: string;
  isFidelity: boolean;
  birthDate: string;
  contacts: Contact[];
  created_at: string;
  updated_at: string;
  roles: string[];
  usingCredit: boolean;
  goal: number;
  password: string;
  policy: boolean;
  constructor(roles: string[] = [], name: string = '', email: string = '') {
    this.name = name;
    this.email = email;
    this.roles = roles;
    this.contacts = [];
    this.goal = 0;
  }
}
