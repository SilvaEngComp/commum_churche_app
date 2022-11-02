import { TestBed } from '@angular/core/testing';

import { ChallengeQuizService } from './challenge-quiz.service';

describe('ChallengeQuizService', () => {
  let service: ChallengeQuizService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChallengeQuizService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
