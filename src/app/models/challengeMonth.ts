import { ChallengeQuiz } from './challengeQuiz';
import { ChallengeWeek } from './challengeWeek';

export class ChallengeMonth {
  month: number;
  challengeWeek: ChallengeWeek[];
  quiz: ChallengeQuiz;

  constructor(month?: number, quiz?: ChallengeQuiz) {
    this.month = month;
    this.quiz = quiz;
  }
}
