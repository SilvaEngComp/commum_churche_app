import { CaixaType } from './caixaType';
/* eslint-disable @typescript-eslint/naming-convention */
import { UiService } from '../services/ui.service';
import { User } from './user';
import { CaixaGroup } from './caixaGroup';
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
  caixaGroup: CaixaGroup;

  constructor(name?: string) {
    this.date = UiService.getCurrentDate();
    this.caixaType = new CaixaType(name);
    this.register = new User();
    this.isEntry = false;
    this.description = '';
  }
}
