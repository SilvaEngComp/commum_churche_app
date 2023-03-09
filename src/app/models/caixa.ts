import { Wallet } from './wallet';
import { CaixaType } from './caixaType';
/* eslint-disable @typescript-eslint/naming-convention */
import { UiService } from '../services/ui.service';
import { User } from './user';
import { CaixaCategory } from './caixaCategory';
import { Church } from './church';
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

  constructor(name?: string) {
    this.date = UiService.getCurrentDate();
    this.caixaType = new CaixaType(name);
    this.register = new User();
    this.register = new User();
    this.isEntry = false;
    this.description = '';
  }
}
