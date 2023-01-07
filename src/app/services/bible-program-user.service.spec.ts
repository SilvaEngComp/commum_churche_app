import { TestBed } from '@angular/core/testing';

import { BibleProgramUserService } from './bible-program-user.service';

describe('BibleProgramUserService', () => {
  let service: BibleProgramUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BibleProgramUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
