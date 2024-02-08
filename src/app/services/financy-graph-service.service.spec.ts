import { TestBed } from '@angular/core/testing';

import { FinancyGraphServiceService } from './financy-graph-service.service';

describe('FinancyGraphServiceService', () => {
  let service: FinancyGraphServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FinancyGraphServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
