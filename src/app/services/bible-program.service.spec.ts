import { TestBed } from '@angular/core/testing';

import { BibleProgramService } from './bible-program.service';

describe('BibleProgramService', () => {
  let service: BibleProgramService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BibleProgramService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
