import { CaixaType } from './caixaType';
/* eslint-disable @typescript-eslint/naming-convention */
import { UiService } from '../services/ui.service';
import { User } from './user';
export class Caixa {
  id: number;
  date: string;
  caixaType: CaixaType;
  amount: number;
  reason: string;
  user: User;
  isEntry: string;
  created_at: string;
  showDetails: boolean;
  constructor(name?: string) {
    this.date = UiService.getCurrentDate();
    this.caixaType = new CaixaType(name);
    this.user = new User();
    this.isEntry = '0';
  }
}
