import { CaixaSummary } from './caixaSummary';
import { TitheSummary } from './tithesummary';
export class FinancySummary {
  caixaSummary: {
    input: CaixaSummary[];
    output: CaixaSummary[];
  };
  titheSummary: {
    tithe: TitheSummary;
    offer: TitheSummary;
  };
  constructor() {}
}
