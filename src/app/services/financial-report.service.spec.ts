import { TestBed } from '@angular/core/testing';

import { FinancialReportService } from './fianancial-report.service';

describe('FinancialReportService', () => {
  let service: FinancialReportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FinancialReportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
