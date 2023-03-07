import { TitheSummary } from './titheSummary';
import { CaixaSummary } from './caixaSummary';
import { Church } from './church';

export class SummaryInput {
  input: {
    church: Church;
    data: {
      input: CaixaSummary;
      tithe: TitheSummary;
      offer: TitheSummary;
    };
  };
}
