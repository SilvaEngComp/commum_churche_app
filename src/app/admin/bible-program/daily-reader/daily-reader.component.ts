import { Constants } from 'src/app/models/constants';
/* eslint-disable @typescript-eslint/no-inferrable-types */
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
import { IonSlides, Platform, PopoverController } from '@ionic/angular';
import { BibleProgramMap } from 'src/app/models/bibleProgramMap';
import { ChallengeQuiz } from 'src/app/models/challengeQuiz';
import { User } from 'src/app/models/User';
import { ExceptionService } from 'src/app/services/exception-service.service';
import { LoginService } from 'src/app/services/login.service';
import { BibleProgramService } from 'src/app/services/bible-program.service';
import { BibleReaderProgram } from 'src/app/models/bibleReaderProgram';
import { ClipboardService } from 'ngx-clipboard';
import { ConstantsMidia } from 'src/app/models/contantsMidia';
import { TutorialComponent } from '../../tutorial/tutorial.component';
import { BibleProgramUserService } from 'src/app/services/bible-program-user.service';

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
    private bibleProgramUserService: BibleProgramUserService,
    private exceptionService: ExceptionService, // private _clipboardService: ClipboardService
    private clipboardService: ClipboardService,
    private popCtrl: PopoverController
  ) {}

  ngOnInit() {
    UiService.localSet(
      Constants.BIBLE_PROGRAM_SUBPAGE,
      Constants.BIBLE_PROGRAM_MENU_READ_DAY
    );

    UiService.setCurrentPage(Constants.TITLE_DAILY_READER);

    this.showMonths = true;
    this.confirm = false;
    const width = this.platfom.width();
    this.width =
      width < 500
        ? Math.round(this.platfom.width() * 0.9) + 'px'
        : Math.round(this.platfom.width() * 0.8) + 'px';
    this.currentMonth = new Date().getMonth() + 1;
    this.currentDay = new Date().getDate();

    this.selectedDay = new Date().getDate();
    this.user = LoginService.getUser();

    this.selectedVerseDay = UiService.localGet(Constants.SELECTED_VERSE_DAY);
    if (!this.selectedVerseDay) {
      this.selectedVerseDay = new VerseDay();
    }
    this.selectedMonth = UiService.localGet(Constants.SELECTED_MONTH_PROGRAM);
    if (!this.selectedMonth) {
      this.selectedMonth = new Date().getMonth();
    }
    this.load();
  }

  async showTutorial(event: any) {
    const pop = await this.popCtrl.create({
      component: TutorialComponent,
      event,
      componentProps: { path: ConstantsMidia.TUTORIAL_BIBLE_READ },
    });

    pop.present();
  }
  doRefresh(ev) {
    window.location.reload();
  }
  async load() {
    this.is_loading = true;
    await this.bibleProgramService
      .show()
      .then((responser) => {
        this.selectedProgram = responser.data;

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
          if (!this.selectedVerseDay.id) {
            bibleProgramMonth.verses.filter((verseDay) => {
              if (
                bibleProgramMonth.customizedMonth.id === this.currentMonth &&
                Number(verseDay.day) === this.currentDay
              ) {
                this.selectedVerseDay = verseDay;
                this.selectedDay = this.currentDay;
              }
            });
          } else {
            this.selectedDay = this.selectedVerseDay.day;
          }
        }
      });
    } else {
      this.showMonths = false;
    }
    this.save();

    this.is_loading = false;
  }
  copy() {
    const text: string = `${this.selectedVerseDay?.startVerse?.book}
    ${this.selectedVerseDay?.startVerse?.chapter}:${this.selectedVerseDay?.startVerse?.verse}/${this.selectedVerseDay?.endVerse?.book}
    ${this.selectedVerseDay?.endVerse?.chapter}:${this.selectedVerseDay?.endVerse?.verse}`;
    this.clipboardService.copy(text);
    this.exceptionService.toastHandler('Texto Copiado');
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
    this.save();
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

    console.log(this.before);
    console.log(this.selectedMonth);
    console.log(this.next);
    this.ajusteSlide();
  }

  gotoBeforeSlide() {
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
    this.bibleProgramUserService
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
    this.save();
    this.sessionPage.emit(Constants.BIBLE_PROGRAM_MENU_VERSE_DAY);
  }

  save() {
    UiService.localSet(Constants.SELECTED_VERSE_DAY, this.selectedVerseDay);
    UiService.localSet(Constants.SELECTED_MONTH_PROGRAM, this.selectedMonth);
  }

  setPlan() {
    this.sessionPage.emit(Constants.BIBLE_PROGRAM_MENU_PLAN);
  }
}
