/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable prefer-arrow/prefer-arrow-functions */
/* eslint-disable @typescript-eslint/prefer-for-of */
/* eslint-disable @typescript-eslint/member-ordering */
import { Component, OnInit, ViewChild } from '@angular/core';
import { Platform, IonSlides } from '@ionic/angular';
import { ChallengeQuizSuggestionService } from 'src/app/services/challenge-quiz-suggestion.service';
import { ChallengeQuizService } from 'src/app/services/challenge-quiz.service';
import { ChallengeService } from 'src/app/services/challenge.service';
import { ExceptionService } from 'src/app/services/exception-service.service';
import { LoginService } from 'src/app/services/login.service';
import { UiService } from 'src/app/services/ui.service';
import { ClipboardService } from 'ngx-clipboard';
import { ChallengeMonth } from 'src/app/models/challengeMonth';
import { ChallengeQuiz } from 'src/app/models/challengeQuiz';
import { ChallengeWeek } from 'src/app/models/challengeWeek';
import { User } from 'src/app/models/User';
import { CustomizedMonth } from 'src/app/models/customizedMonth';
@Component({
  selector: 'app-challenge',
  templateUrl: './challenge.page.html',
  styleUrls: ['./challenge.page.scss'],
})
export class ChallengePage implements OnInit {
  @ViewChild('monthSlides', { static: false }) slide: IonSlides;
  challenges: ChallengeMonth[] = [];

  user: User;
  width: string;
  widthSlide: string;
  transferValue: string;
  confirm: boolean;
  monthSlide: CustomizedMonth[] = [];
  before: number;
  selectedMonth: number;
  selectedWeek: number;
  next: number;
  showMonths: boolean;
  isMonthInChallenges: boolean;
  quiz: ChallengeQuiz;
  vote: number;
  selectedDescription: string;
  is_loading: boolean;
  selectedChallengeWeek: ChallengeWeek;
  showChallengeWeekEdit: boolean;
  constructor(
    private platfom: Platform,
    private challengeService: ChallengeService,
    private challengeQuizService: ChallengeQuizService,
    private challengeQuizSuggestionService: ChallengeQuizSuggestionService,
    private exceptionService: ExceptionService,
    private _clipboardService: ClipboardService
  ) {}

  ngOnInit() {
    this.showMonths = true;
    this.confirm = false;
    this.width = this.platfom.width() * 0.8 + 'px';
    this.monthSlide = CustomizedMonth.monthsOfYear();
    this.selectedMonth = new Date().getMonth();
    this.selectedWeek = UiService.getWeekNumber();
    this.user = LoginService.getUser();
    this.selectedChallengeWeek = new ChallengeWeek();
    this.load();
  }

  async load() {
    this.is_loading = true;
    this.challenges = await this.challengeService.get();
    this.quiz = await this.challengeQuizService.oppenedQuiz();

    this.ajusteSlide();

    this.setSelectedMonth();
    this.is_loading = false;
  }

  ajusteSlide() {
    if (this.challenges.length > 0) {
      this.challenges.filter((challengeMonth) => {
        if (challengeMonth.month === this.selectedMonth) {
          let cont = 0;
          challengeMonth.challengeWeek.filter((challengeWeek) => {
            if (challengeWeek.numberWeek === this.selectedWeek) {
              this.selectedWeek = cont;
              this.selectedChallengeWeek = challengeWeek;
            }
            cont++;
          });
        }
      });
    } else {
      this.showMonths = false;
    }
    if (this.quiz) {
      this.challenges.push(new ChallengeMonth(-1, this.quiz));

      if (this.quiz.challengeQuizUserVote) {
        this.vote = this.quiz.challengeQuizUserVote.vote;
      }
    }
  }
  copy(text: string) {
    this._clipboardService.copy(text);
    this.exceptionService.toastHandler('Texto Copiado');
  }
  quizReturn(obj: any) {
    if (obj.challenges) {
      this.challenges = obj.challenges;
    }
    if (obj.quiz) {
      this.quiz = obj.quiz;
    }
    this.ajusteSlide();
  }
  setSelectedWeek(i) {
    this.selectedWeek = i;
    this.selectedChallengeWeek =
      this.challenges[this.selectedMonth].challengeWeek[i];
  }
  limitForQuiz: boolean;
  setSelectedMonth() {
    if (this.selectedMonth >= 1) {
      this.before = this.selectedMonth - 1;
    } else {
      this.before = 11;
    }

    if (this.selectedMonth < 11) {
      this.next = this.selectedMonth + 1;
    } else {
      this.next = 0;
    }
  }

  gotoBeforeSlide() {
    this.slide.slidePrev();
    this.selectedMonth--;
    this.setSelectedMonth();
  }
  gotoNextSlide() {
    this.slide.slideNext();
    this.selectedMonth++;
    this.setSelectedMonth();
  }

  async onScroll(slide: IonSlides) {
    // this.showMonths = false;
    this.selectedMonth = await slide.getActiveIndex();

    const is_end = await slide.isEnd();

    if (is_end && this.quiz) {
      this.showMonths = false;
    } else {
      this.showMonths = true;

      this.setSelectedMonth();
    }
  }

  challengeDone(challengeWeek: ChallengeWeek) {
    this.is_loading = true;
    this.challengeService.setAsDone(challengeWeek).then((responser) => {
      this.challenges = responser.data[0];
      this.quiz = responser.data[1];
      this.ajusteSlide();
      this.is_loading = false;
      this.setSelectedWeek(this.selectedWeek);

      this.exceptionService.success(responser);
    });
  }

  sendChallengeWeekUpdate(challengeWeek: ChallengeWeek) {
    this.challengeQuizSuggestionService
      .update(challengeWeek.challengeSuggestion)
      .then((resp) => {
        this.showChallengeWeekEdit = false;
        this.exceptionService.success(resp);
      });
  }
}
