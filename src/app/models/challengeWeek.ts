/* eslint-disable @typescript-eslint/naming-convention */
import { ChallengeQuizSuggestionVote } from './challengeQuizSuggestionVote';
import { ChallengeSuggestion } from './challengeSuggestion';
import { User } from './User';

export class ChallengeWeek {
  id: number;
  challengeSuggestion: ChallengeSuggestion;
  numberWeek: number;
  usersDone: User[];
  done: boolean;

  constructor() { }
}
