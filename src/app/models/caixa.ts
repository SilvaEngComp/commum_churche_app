import { Wallet } from './wallet';
import { CaixaType } from './caixaType';
/* eslint-disable @typescript-eslint/naming-convention */
import { CaixaCategory } from './caixaCategory';
import { Church } from './church';
import { User } from './User';
export class Caixa {
  id: number;
  date: string;
  caixaType: CaixaType;
  amount: number;
  description: string;
  register: User;
  isEntry: boolean;
  created_at: string;
  showDetails: boolean;
  church: Church;
  caixaCategory: CaixaCategory;
  wallet: Wallet;
  file: string;

  constructor(
    amount?: number,
    date?: string,
    description?: string,
    church?: Church,
    caixaCategory?: CaixaCategory,
    caixaType?: CaixaType,
    isEntry?: boolean,
    wallet?: number
  ) {
    this.wallet = new Wallet(wallet);
    if (caixaCategory) {
      this.caixaCategory = caixaCategory;
    } else {
      this.caixaCategory = new CaixaCategory();
    }
    if (caixaType) {
      this.caixaType = caixaType;
    } else {
      this.caixaType = new CaixaType();
    }

    if (amount) {
      this.amount = amount;
    }
    if (date) {
      this.date = date;
    }
    if (description) {
      this.description = description;
    }
    if (church) {
      this.church = church;
    }
    if (isEntry) {
      this.isEntry = isEntry;
    } else {
      this.isEntry = false;
    }

    this.register = new User();
  }
}
