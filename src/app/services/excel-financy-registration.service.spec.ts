import { TestBed } from '@angular/core/testing';

import { ExcelFinancyRegistrationService } from './excel-financy-registration.service';

describe('ExcelFinancyRegistrationService', () => {
  let service: ExcelFinancyRegistrationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExcelFinancyRegistrationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
