import { Installment } from './installment';
import { PaymentMethod } from './paymentMethod';

export class Payment {
  id: number;
  amount: number;
  payBack: number;
  installments: Installment[];
  paymentMethod: PaymentMethod;

  constructor(amount: number = 0) {
    this.amount = amount;
    this.payBack = 0;
    this.installments = new Array();
    this.paymentMethod = new PaymentMethod(1);
  }
}
