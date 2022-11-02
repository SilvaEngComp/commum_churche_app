import { TestBed } from '@angular/core/testing';

import { FeedReactionService } from './feed-reaction.service';

describe('FeedReactionService', () => {
  let service: FeedReactionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FeedReactionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
