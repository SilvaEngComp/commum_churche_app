/* eslint-disable @typescript-eslint/member-ordering */
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ChallengeQuiz } from 'src/app/models/challengeQuiz';
import { ChallengeSuggestion } from 'src/app/models/challengeSuggestion';
import { User } from 'src/app/models/User';
import { ChallengeQuizSuggestionService } from 'src/app/services/challenge-quiz-suggestion.service';
import { ChallengeQuizVoteService } from 'src/app/services/challenge-quiz-vote.service';
import { ExceptionService } from 'src/app/services/exception-service.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss'],
})
export class QuizComponent implements OnInit {
  @Output() quizReturn: EventEmitter<any> = new EventEmitter<any>();
  @Input() quiz: ChallengeQuiz;
  @Input() user: User;
  @Input() width: string;

  showAddSuggestion: boolean;
  selectedSuggestionVotes: number;
  newChallengeWeekSuggesion: ChallengeSuggestion;
  vote: number;
  selectedDescription: string;

  constructor(
    private challengeQuizVoteService: ChallengeQuizVoteService,
    private challengeQuizSuggestionService: ChallengeQuizSuggestionService,
    private exceptionService: ExceptionService,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {
    this.newChallengeWeekSuggesion = new ChallengeSuggestion();
    this.setSelectedDescription();
    console.log(this.quiz);
  }

  setSelectedDescription() {
    if (this.quiz.challengeSuggestions) {
      this.quiz.challengeSuggestions.filter((challengeSuggestion) => {
        if (challengeSuggestion.id === this.vote) {
          this.selectedDescription = challengeSuggestion.description;
          this.selectedSuggestionVotes = challengeSuggestion.votes.votes;
          if (challengeSuggestion.user.id === this.user.id) {
            this.newChallengeWeekSuggesion = challengeSuggestion;
          } else {
            this.newChallengeWeekSuggesion = new ChallengeSuggestion();
          }
        }
      });
    }
  }

  postNewChallengeSuggestion() {
    if (!this.newChallengeWeekSuggesion.id) {
      this.challengeQuizSuggestionService
        .store(this.newChallengeWeekSuggesion, this.quiz)
        .then((responser) => {
          this.quiz = responser.data;
          this.setSelectedDescription();
          this.quizReturn.emit({ quiz: this.quiz });
          this.exceptionService.success(responser);
          this.showAddSuggestionButton();
        });
    } else {
      this.challengeQuizSuggestionService
        .update(this.newChallengeWeekSuggesion)
        .then((responser) => {
          this.quiz = responser.data;
          this.setSelectedDescription();

          this.exceptionService.success(responser);
          this.showAddSuggestionButton();
        });
    }
  }

  countVote() {
    const moreVotted = this.quiz.challengeSuggestions.sort((a, b) =>
      a.votes.votes > b.votes.votes ? -1 : 1
    );
    this.challengeQuizSuggestionService
      .makeNewChallengeWeek(moreVotted[0], this.quiz)
      .then((responseronser) => {
        this.quizReturn.emit({ challenges: responseronser.data });
        this.exceptionService.alertDialog(
          `O desafio
        ${moreVotted[0].description}, ganhou com
        ${moreVotted[0].votes.votes} voto(s)!`
        );
      });
  }

  setVote() {
    if (!this.quiz.challengeQuizUserVote) {
      this.challengeQuizVoteService
        .store(this.vote, this.quiz)
        .then((responser) => {
          this.quiz = responser.data;
          this.setSelectedDescription();

          this.quizReturn.emit({ quiz: this.quiz });
          this.exceptionService.success(responser);
        })
        .catch((err) => this.exceptionService.error(err));
    } else if (this.quiz.challengeQuizUserVote.vote === this.vote) {
      this.challengeQuizVoteService
        .destroy(this.quiz)
        .then((responser) => {
          this.newChallengeWeekSuggesion = null;
          this.quiz = responser.data;
          this.quizReturn.emit({ quiz: this.quiz });
          this.setSelectedDescription();

          this.exceptionService.success(responser);
        })
        .catch((err) => this.exceptionService.error(err));
    } else {
      this.challengeQuizVoteService
        .update(this.vote, this.quiz)
        .then((responser) => {
          this.exceptionService.success(responser);
          this.quiz = responser.data;
          this.quizReturn.emit({ quiz: this.quiz });
          this.setSelectedDescription();
        })
        .catch((err) => this.exceptionService.error(err));
    }
  }

  async deleteSuggestion() {
    const alert = await this.alertCtrl.create({
      header: 'Deletando minha sugestão',
      message: 'Está certo disso?',
      buttons: [
        {
          text: 'Cancelar',
        },
        {
          text: 'Ok',
          handler: () => {
            this.challengeQuizSuggestionService
              .destroy(this.newChallengeWeekSuggesion)
              .then((responser) => {
                this.quiz = responser.data;
                this.exceptionService.success(responser);
              });
          },
        },
      ],
    });
    alert.present();
  }

  showAddSuggestionButton(edit: boolean = false) {
    this.showAddSuggestion = !this.showAddSuggestion;
    if (!edit) {
      this.newChallengeWeekSuggesion = new ChallengeSuggestion();
    }
  }
}
