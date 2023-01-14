import { TestBed } from '@angular/core/testing';

import { ChurchScheduleTypeService } from './church-schedule-type.service';

describe('ChurchScheduleTypeService', () => {
  let service: ChurchScheduleTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChurchScheduleTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
