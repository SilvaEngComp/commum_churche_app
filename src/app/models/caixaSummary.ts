import { CaixaType } from './caixaType';
import { Tithe } from './tithe';
import { Caixa } from './caixa';
export class FinancySummary {
  caixaSummary: CaixaSummary[];
  titheSummary: TitheSummary;
  offerSummary: TitheSummary;

  constructor() {}
}

export class CaixaSummary {
  total: number;
  caixaType: CaixaType;
  caixas: Caixa[];
  showDetails: boolean;

  constructor() {
    this.total = 0;
  }
}

export class TitheSummary {
  total: number;
  tithes: Tithe[];

  constructor() {
    this.total = 0;
  }
}
