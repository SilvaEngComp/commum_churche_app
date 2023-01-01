import { TestBed } from '@angular/core/testing';

import { UserVerseMarkService } from './user-verse-mark.service';

describe('UserVerseMarkService', () => {
  let service: UserVerseMarkService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserVerseMarkService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
