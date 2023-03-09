import { CaixaCategory } from './caixaCategory';
import { Caixa } from './caixa';
import { CaixaType } from './caixaType';

export class CaixaSummary {
  total: number;
  caixaCategory: CaixaCategory;
  caixaType: CaixaType;
  caixas: Caixa[];
  showDetails: boolean;
  isEntry: boolean;
  constructor() {
    this.total = 0;
  }
}
