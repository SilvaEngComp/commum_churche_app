import { Caixa } from './caixa';
import { CaixaType } from './caixaType';

export class CaixaSummary {
  total: number;
  caixaType: CaixaType;
  caixas: Caixa[];
  showDetails: boolean;
  isEntry: boolean;
  constructor() {
    this.total = 0;
  }
}
