import { CaixaGroup } from './caixaGroup';
import { Caixa } from './caixa';
import { CaixaType } from './caixaType';

export class CaixaSummary {
  total: number;
  caixaGroup: CaixaGroup;
  caixas: Caixa[];
  showDetails: boolean;
  isEntry: boolean;
  constructor() {
    this.total = 0;
  }
}
