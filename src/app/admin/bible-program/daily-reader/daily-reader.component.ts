import { Constants } from './../../../models/constants';
import { UiService } from './../../../services/ui.service';
import { VerseDay } from './../../../models/verseDay';
import { CustomizedMonth } from 'src/app/models/customizedMonth';
/* eslint-disable @typescript-eslint/naming-convention */
import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { IonSlides, Platform } from '@ionic/angular';
import { BibleProgramMap } from 'src/app/models/bibleProgramMap';
import { ChallengeQuiz } from 'src/app/models/challengeQuiz';
import { User } from 'src/app/models/User';
import { ExceptionService } from 'src/app/services/exception-service.service';
import { LoginService } from 'src/app/services/login.service';
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
  @Output() sessionPage: EventEmitter<string> = new EventEmitter<string>();

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
  currentMonth: number;
  currentDay: number;
  next: number;
  showMonths: boolean;
  is_loading: boolean;
  selectedVerseDay: VerseDay;
  showVerseDayText: boolean;
  limitForQuiz: boolean;
  selectedProgram: BibleReaderProgram;
  selectedProgramMonth: BibleProgramMap;
  constructor(
    private platfom: Platform,
    private bibleProgramService: BibleProgramService,
    private exceptionService: ExceptionService // private _clipboardService: ClipboardService
  ) {}

  ngOnInit() {
    UiService.localSet(
      Constants.TITLE_CURRENT_PAGE,
      Constants.TITLE_DAILY_READER
    );
    this.showMonths = true;
    this.confirm = false;
    this.width = Math.round(this.platfom.width() * 0.8) + 'px';
    this.currentMonth = new Date().getMonth() + 1;
    this.currentDay = new Date().getDate();

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
        this.ajusteSlide();

        this.setSelectedMonth();
      })
      .catch(() => (this.is_loading = false));
  }

  ajusteSlide() {
    if (this.selectedProgram?.program.length > 0) {
      const adaptedMonth = this.selectedMonth + 1;
      this.selectedProgram?.program?.filter((bibleProgramMonth) => {
        this.monthSlide.push(bibleProgramMonth.customizedMonth);
        if (bibleProgramMonth.customizedMonth.id === adaptedMonth) {
          this.selectedProgramMonth = bibleProgramMonth;
          bibleProgramMonth.verses.filter((verseDay) => {
            if (
              bibleProgramMonth.customizedMonth.id === this.currentMonth &&
              Number(verseDay.day) === this.currentDay
            ) {
              this.selectedVerseDay = verseDay;
              this.selectedDay = this.currentDay;
              console.log(this.selectedDay);
            } else {
              this.selectedDay = -1;
            }
          });
        }
      });
    } else {
      this.showMonths = false;
    }
    this.is_loading = false;
  }
  copy(text: string) {
    // this._clipboardService.copy(text);
    // this.exceptionService.toastHandler('Texto Copiado');
  }

  setSelectedDay(verseDay: VerseDay) {
    this.selectedDay = verseDay?.day;
    const adaptedMonth = this.selectedMonth + 1;
    this.selectedProgram?.program.filter((programDay) => {
      if (programDay?.customizedMonth?.id === adaptedMonth) {
        programDay?.verses.filter((verse) => {
          if (verse?.day === verseDay?.day) {
            this.selectedVerseDay = verse;
          }
        });
      }
    });
  }
  setSelectedMonth() {
    if (this.selectedMonth > 0 && this.selectedMonth < 11) {
      this.before = this.selectedMonth - 1;
      this.next = this.selectedMonth + 1;
    } else if (this.selectedMonth === 11) {
      this.before = 10;
      this.next = 0;
    } else if (this.selectedMonth > 11) {
      this.before = 11;
      this.selectedMonth = 0;
      this.next = 1;
    } else if (this.selectedMonth === 0) {
      this.before = 11;
      this.next = 1;
    } else if (this.selectedMonth < 0) {
      this.before = 10;
      this.selectedMonth = 11;
      this.next = 0;
    }

    this.ajusteSlide();
  }

  gotoBeforeSlide() {
    console.log(this.selectedMonth);
    if (this.selectedMonth > 1) {
      this.slide.slidePrev();
      this.selectedMonth--;
      this.setSelectedMonth();
    } else {
      this.selectedMonth--;
      this.slide.slideTo(this.monthSlide.length);
      this.setSelectedMonth();
    }
  }
  gotoNextSlide() {
    console.log(this.selectedMonth);
    if (this.selectedMonth < 11) {
      this.slide.slideNext();
      this.selectedMonth++;
      this.setSelectedMonth();
    } else {
      this.selectedMonth++;
      this.slide.slideTo(0);
      this.setSelectedMonth();
    }
  }

  async onScroll(slide: IonSlides) {
    // this.showMonths = false;
    this.selectedMonth = await slide.getActiveIndex();

    const is_end = await slide.isEnd();

    this.showMonths = true;

    this.setSelectedMonth();
  }

  setAsReadUnread(verseDay: VerseDay) {
    this.is_loading = true;
    this.bibleProgramService
      .setAsDone(this.selectedProgram, verseDay)
      .then((responser) => {
        const adaptedMonth = this.selectedMonth + 1;
        this.selectedProgram?.program.filter((programDay) => {
          if (programDay?.customizedMonth?.id === adaptedMonth) {
            programDay?.verses.filter((verse) => {
              if (verse?.day === verseDay?.day) {
                verse.isRead = responser.data !== null ? true : false;
                this.selectedVerseDay = verse;
              }
            });
          }
        });
        this.exceptionService.success(responser);
      })
      .finally(() => (this.is_loading = false));
  }

  readVerses() {
    UiService.localSet(Constants.SELECTED_VERSE_DAY, this.selectedVerseDay);
    this.sessionPage.emit(Constants.BIBLE_PROGRAM_MENU_VERSE_DAY);
  }
}
