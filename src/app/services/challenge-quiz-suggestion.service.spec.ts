import { TestBed } from '@angular/core/testing';

import { ChallengeQuizSuggestionService } from './challenge-quiz-suggestion.service';

describe('ChallengeQuizSuggestionService', () => {
  let service: ChallengeQuizSuggestionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChallengeQuizSuggestionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
