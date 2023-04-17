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
  rowNumber: number;
  problems: string[];

  constructor(
    amount?: number,
    date?: string,
    description?: string,
    church?: Church,
    caixaCategory?: CaixaCategory,
    caixaType?: CaixaType,
    isEntry?: boolean,
    wallet?: number,
    rowNumber?: number,
    problems?: string[]
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

    this.amount = amount;
    this.date = date;
    this.description = description;
    this.church = church;
    this.isEntry = isEntry;
    this.rowNumber = rowNumber;
    this.problems = problems;

    this.register = new User();
  }
}
