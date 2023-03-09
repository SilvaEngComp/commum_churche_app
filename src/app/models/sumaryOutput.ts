import { CaixasReportCategory } from './CaixaReportCategory';
import { Church } from './church';
import { CaixaReport } from './CaixaReportChurch';

export class SummaryOutput {
  total: number;
  reports: OutputReport[];
}

export class OutputReport {
  church: Church;
  caixaReport: CaixaReport;
}
