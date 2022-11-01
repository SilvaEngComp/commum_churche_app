import { Installment } from './installment';
import { Cashier } from './cashier';
export class FinancialReport {
  totalSales: number;
  totalCash: number;
  totalDebit: number;
  totalCredit: number;
  totalInstallmentPlan: number;
  totalInstallmentPayedByCash: number;
  totalInstallmentPayedByCard: number;
  cashIn: number;
  cashOut: number;
  profit: number;
  totalInDrawer: number;
  manualCashier: Cashier;
  payedInstallments: Installment[];
  cashierOuts: Cashier[];
  constructor() {
    this.manualCashier = new Cashier();
    this.cashierOuts = [];
    this.payedInstallments = [];
  }
}
