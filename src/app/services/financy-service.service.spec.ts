import { TestBed } from '@angular/core/testing';

import { FinancyServiceService } from './financy-service.service';

describe('FinancyServiceService', () => {
  let service: FinancyServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FinancyServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
