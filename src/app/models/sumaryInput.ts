import { TitheSummary } from './titheSummary';
import { Church } from './church';
import { CaixaReport } from './CaixaReportChurch';

export class SummaryInput {
  total: number;
  reports: InputsReport[];
}

export class InputsReport {
  church: Church;
  total: number;
  caixaReport: CaixaReport;
  tithe: TitheReport;
  offer: TitheReport;
}

export class TitheReport {
  titheSummary: TitheSummary;
  showDetails: boolean;
}
