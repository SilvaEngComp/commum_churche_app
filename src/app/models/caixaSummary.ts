import { CaixaCategory } from './caixaCategory';
import { Caixa } from './caixa';
import { CaixaSubcategory } from './caixaSubcategory';

export class CaixaSummary {
  total: number;
  caixaCategory: CaixaCategory;
  caixaSubcategory: CaixaSubcategory;
  caixas: Caixa[];
  showDetails: boolean;
  isEntry: boolean;
  constructor() {
    this.total = 0;
  }
}
