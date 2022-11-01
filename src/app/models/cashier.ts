import { CashierType } from './cashierType';
/* eslint-disable @typescript-eslint/naming-convention */
import { UiService } from '../services/ui.service';
import { User } from './user';
export class Cashier {
  id: number;
  date: string;
  type: CashierType;
  amount: number;
  reason: string;
  seller: User;
  created_at: string;

  constructor(
    caixaType: number = 1,
    reason: string = 'Entrada',
    amount: number = 0
  ) {
    this.date = UiService.getCurrentDate();
    this.type = new CashierType(caixaType);
    this.amount = UiService.convertToNumber(String(amount));
    this.reason = reason;
    this.seller = new User();
  }
}
