/* eslint-disable @typescript-eslint/naming-convention */
import { CustomizedMonth } from './customizedMonth';
export class Tithe {
  id: number;
  amount: number;
  isTithe: boolean;
  month: string;
  year: string;
  customizedMonth: CustomizedMonth;
  showDetails: boolean;
  created_at: string;
  constructor() {
    this.customizedMonth = new CustomizedMonth();
  }
}
