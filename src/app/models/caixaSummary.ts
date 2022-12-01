import { CaixaType } from './caixaType';
import { Tithe } from './tithe';
import { Caixa } from './caixa';
export class CaixaSummary {
  caixaSummary: [
    {
      total: number;
      caixaType: CaixaType;
      caixas: Caixa[];
    }
  ];
  titheSummary: {
    total: number;
    tithes: Tithe[];
  };
  offerSummary: {
    total: number;
    tithes: Tithe[];
  };

  constructor() {}
}
