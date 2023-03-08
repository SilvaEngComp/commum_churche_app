import { CaixasReportCategory } from './CaixaReportCategory';
import { CaixaSummary } from './caixaSummary';
import { Church } from './church';

export class CaixaReport {
  church: Church;
  caixaReportCategory: CaixasReportCategory;
  showDetails: boolean;
}
