import { CaixaReport } from './CaixaReportChurch';

export class SummaryOutput {
  total: number;
  reports: OutputReport[];
}

export class OutputReport {
  output: CaixaReport;
}
