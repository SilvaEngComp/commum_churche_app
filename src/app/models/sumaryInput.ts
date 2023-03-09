import { TitheSummary } from './titheSummary';
import { Church } from './church';
import { CaixaReport } from './CaixaReportChurch';

export class SummaryInput {
  total: number;
  reports: InputsReport[];
}

export class InputsReport {
  caixaReport: CaixaReport;
  tithe: TitheReport;
  offer: TitheReport;
}

export class TitheReport {
  church: Church;
  titheSummary: TitheSummary;
  showDetails: boolean;
}
