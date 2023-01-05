import { TestBed } from '@angular/core/testing';

import { ChurchScheduleService } from './churchSchedule.service';

describe('ChurchScheduleService', () => {
  let service: ChurchScheduleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChurchScheduleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
