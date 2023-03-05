/* eslint-disable @typescript-eslint/naming-convention */
import { CustomizedMonth } from './customizedMonth';
import { User } from './User';
export class Tithe {
  id: number;
  amount: number;
  isTithe: boolean;
  date: string;
  showDetails: boolean;
  created_at: string;
  user: User;
  register: User;
  constructor() {
    this.isTithe = true;
  }
}
