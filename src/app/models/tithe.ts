import { CustomizedMonth } from './customizedMonth';
export class Tithe {
  date: string;
  amount: number;
  isTithe: boolean;
  monthRefer: CustomizedMonth;

  constructor() {
    this.monthRefer = new CustomizedMonth();
  }
}
