import { CaixaType } from './caixaType';
/* eslint-disable @typescript-eslint/naming-convention */
import { UiService } from '../services/ui.service';
import { User } from './user';
export class Caixa {
  id: number;
  date: string;
  type: CaixaType;
  amount: number;
  reason: string;
  user: User;
  isEntry: boolean;
  created_at: string;
  showDetails: boolean;
  constructor(name?: string) {
    this.date = UiService.getCurrentDate();
    this.type = new CaixaType(name);
    this.user = new User();
  }
}
