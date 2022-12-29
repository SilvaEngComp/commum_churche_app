import { VerseDay } from './../../../models/verseDay';
import { CustomizedMonth } from 'src/app/models/customizedMonth';
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides, Platform } from '@ionic/angular';
import { BibleProgramMap } from 'src/app/models/bibleProgramMap';
import { ChallengeQuiz } from 'src/app/models/challengeQuiz';
import { User } from 'src/app/models/User';
import { ExceptionService } from 'src/app/services/exception-service.service';
import { LoginService } from 'src/app/services/login.service';
import { UiService } from 'src/app/services/ui.service';
import { BibleProgramService } from 'src/app/services/bible-program.service';
import { BibleReaderProgram } from 'src/app/models/bibleReaderProgram';
// import { ClipboardService } from 'ngx-clipboard';
// npm i ngx-clipboard
@Component({
  selector: 'app-daily-reader',
  templateUrl: './daily-reader.component.html',
  styleUrls: ['./daily-reader.component.scss'],
})
export class DailyReaderComponent implements OnInit {
  @ViewChild('monthSlides', { static: false }) slide: IonSlides;
  bibleprogram: BibleProgramMap[] = [];

  user: User;
  width: string;
  widthSlide: string;
  transferValue: string;
  confirm: boolean;
  monthSlide: CustomizedMonth[] = [];
  before: number;
  selectedMonth: number;
  selectedDay: number;
  next: number;
  showMonths: boolean;
  isMonthInBibleProgram: boolean;
  quiz: ChallengeQuiz;
  vote: number;
  selectedDescription: string;
  is_loading: boolean;
  selectedVerseDay: VerseDay;
  showVerseDayText: boolean;
  limitForQuiz: boolean;
  selectedProgram: BibleReaderProgram;
  bibleProgram: BibleProgramMap[];
  constructor(
    private platfom: Platform,
    private bibleProgramService: BibleProgramService,
    private exceptionService: ExceptionService // private _clipboardService: ClipboardService
  ) {}

  ngOnInit() {
    this.showMonths = true;
    this.confirm = false;
    this.width = Math.round(this.platfom.width() * 0.8) + 'px';
    this.selectedMonth = new Date().getMonth();
    this.selectedDay = new Date().getDate();
    this.user = LoginService.getUser();
    this.selectedVerseDay = new VerseDay();
    this.load();
  }

  async load() {
    this.is_loading = true;
    await this.bibleProgramService
      .show()
      .then((responser) => {
        this.selectedProgram = responser.data;
        this.bibleProgram = this.selectedProgram?.program;
        this.ajusteSlide();

        this.setSelectedMonth();
      })
      .finally(() => (this.is_loading = false));
  }

  ajusteSlide() {
    console.log(this.bibleProgram);
    if (this.selectedProgram?.program.length > 0) {
      this.selectedProgram?.program?.filter((bibleProgramMonth) => {
        this.monthSlide.push(bibleProgramMonth.customizedMonth);
        if (bibleProgramMonth.customizedMonth.id === this.selectedMonth) {
          bibleProgramMonth.verses.filter((verseDay) => {
            if (Number(verseDay.day) === this.selectedDay) {
              this.selectedVerseDay = verseDay;
            }
          });
        }
      });
    } else {
      this.showMonths = false;
    }
    console.log(this.selectedVerseDay);
  }
  copy(text: string) {
    // this._clipboardService.copy(text);
    // this.exceptionService.toastHandler('Texto Copiado');
  }
  quizReturn(obj: any) {
    if (obj.bibleprogram) {
      this.bibleprogram = obj.bibleprogram;
    }
    if (obj.quiz) {
      this.quiz = obj.quiz;
    }
    this.ajusteSlide();
  }

  setSelectedDay(i) {
    this.selectedDay = i;
    // this.selectedVerseDay =
    //   this.bibleprogram[this.selectedMonth].bibleProgramMap[i];
  }
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

  challengeDone(verseDay: VerseDay) {
    this.is_loading = true;
    this.bibleProgramService.setAsDone(verseDay).then((responser) => {
      this.bibleprogram = responser.data[0];
      this.quiz = responser.data[1];
      this.ajusteSlide();
      this.is_loading = false;
      this.setSelectedDay(this.selectedDay);

      this.exceptionService.success(responser);
    });
  }
}
