import { TestBed } from '@angular/core/testing';

import { FinancialFacadeService } from './financial-facade.service';

describe('FinancialFacadeService', () => {
  let service: FinancialFacadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FinancialFacadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
