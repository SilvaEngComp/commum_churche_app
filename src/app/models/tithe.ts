/* eslint-disable @typescript-eslint/naming-convention */
import { CustomizedMonth } from './customizedMonth';
import { User } from './User';
export class Tithe {
  id: number;
  amount: number;
  isTithe: string;
  month: string;
  year: string;
  customizedMonth: CustomizedMonth;
  showDetails: boolean;
  created_at: string;
  user: User;
  constructor() {
    this.customizedMonth = new CustomizedMonth();
    this.isTithe = '1';
  }
}
