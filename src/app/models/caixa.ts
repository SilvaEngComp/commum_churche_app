import { CaixaSubcategory } from './caixaSubcategory';
/* eslint-disable @typescript-eslint/naming-convention */
import { UiService } from '../services/ui.service';
import { User } from './user';
import { CaixaCategory } from './caixaCategory';
import { Church } from './church';
export class Caixa {
  id: number;
  date: string;
  caixaSubcategory: CaixaSubcategory;
  amount: number;
  description: string;
  register: User;
  isEntry: boolean;
  created_at: string;
  showDetails: boolean;
  church: Church;
  caixaCategory: CaixaCategory;

  constructor(name?: string) {
    this.date = UiService.getCurrentDate();
    this.caixaSubcategory = new CaixaSubcategory(name);
    this.register = new User();
    this.isEntry = false;
    this.description = '';
  }
}
