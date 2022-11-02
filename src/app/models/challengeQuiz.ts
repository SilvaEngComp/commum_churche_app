import { ChallengeQuizUserVote } from './challangeQuizUserVote';
import { ChallengeSuggestion } from './challengeSuggestion';

export class ChallengeQuiz {
  id: number;
  dateF: string;
  status: boolean;
  challengeSuggestions: ChallengeSuggestion[];
  challengeQuizUserVote: ChallengeQuizUserVote;
  constructor() {
    this.challengeSuggestions = [];
  }
}
