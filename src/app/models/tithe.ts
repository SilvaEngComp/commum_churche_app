/* eslint-disable @typescript-eslint/naming-convention */
import { CustomizedMonth } from './customizedMonth';
export class Tithe {
  id: number;
  amount: number;
  isTithe: boolean;
  month: string;
  year: string;
  CustomizedMonth: CustomizedMonth;
  showDetails: boolean;
  created_at: string;
  constructor() {
    this.CustomizedMonth = new CustomizedMonth();
  }
}
