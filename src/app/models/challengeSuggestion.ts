/* eslint-disable @typescript-eslint/naming-convention */
import { ChallengeQuizSuggestionVote } from './challengeQuizSuggestionVote';
import { User } from './User';

export class ChallengeSuggestion {
  id: number;
  name: string;
  description: string;
  selected: boolean;
  user?: User;
  votes: ChallengeQuizSuggestionVote;
  constructor() { }
}
