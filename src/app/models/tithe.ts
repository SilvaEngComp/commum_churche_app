/* eslint-disable @typescript-eslint/naming-convention */
import { CustomizedMonth } from './customizedMonth';
export class Tithe {
  id: number;
  amount: number;
  isTithe: boolean;
  month: number;
  year: number;
  CustomizedMonth: CustomizedMonth;
  showDetails: boolean;
  constructor() {
    this.CustomizedMonth = new CustomizedMonth();
  }
}
