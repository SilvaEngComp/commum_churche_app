/* eslint-disable no-debugger */
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
    private exceptionService: ExceptionService,
    private clipboardService: ClipboardService,
    private popCtrl: PopoverController
  ) {}

  ngOnInit() {
    UiService.localSet(
      Constants.BIBLE_PROGRAM_SUBPAGE,
      Constants.BIBLE_PROGRAM_MENU_READ_DAY
    );

    UiService.localSet(
      ConstantsMidia.OPPEN_TUTORIAL,
      ConstantsMidia.TUTORIAL_BIBLE_READ
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

  doRefresh(ev) {
    window.location.reload();
  }
  async load() {
    this.is_loading = true;
    await this.bibleProgramService
      .show()
      .then((responser) => {
        this.selectedProgram = responser.data;

        this.ajusteSlide();
      })
      .catch(() => (this.is_loading = false));
  }

  ajusteSlide() {
    if (this.selectedProgram?.program.length > 0) {
      const adaptedMonth = this.selectedMonth + 1;
      this.monthSlide = [];
      this.selectedProgram?.program?.filter((bibleProgramMonth) => {
        this.monthSlide.push(bibleProgramMonth.customizedMonth);
        bibleProgramMonth.verses.filter((verseDay) => {
          if (
            !verseDay?.isRead &&
            (verseDay?.id < this?.selectedVerseDay?.id ||
              !this?.selectedVerseDay?.id)
          ) {
            this.selectedVerseDay = verseDay;
          }
        });
        if (
          bibleProgramMonth.customizedMonth.id ===
          Number(this?.selectedVerseDay?.month)
        ) {
          this.selectedProgramMonth = bibleProgramMonth;
          this.selectedMonth = bibleProgramMonth.customizedMonth.id - 1;
        }
      });
    } else {
      this.showMonths = false;
    }
    this.setSelectedMonth();
    this.save();

    this.is_loading = false;
  }

  copy() {
    const text: string = `${this.selectedVerseDay?.startVerse?.book?.name}
    ${this.selectedVerseDay?.startVerse?.chapter}:${this.selectedVerseDay?.startVerse?.verse}/${this.selectedVerseDay?.endVerse?.book?.name}
    ${this.selectedVerseDay?.endVerse?.chapter}:${this.selectedVerseDay?.endVerse?.verse}`;
    this.clipboardService.copy(text);
    this.exceptionService.toastHandler('Texto Copiado');
  }

  setSelectedDay(verseDay: VerseDay) {
    const adaptedMonth = this.selectedMonth + 1;
    this.selectedVerseDay = null;
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
      this.next = -1;
    } else if (this.selectedMonth > 11) {
      this.before = 11;
      this.selectedMonth = 0;
      this.next = 1;
    } else if (this.selectedMonth === 0) {
      this.before = -1;
      this.next = 1;
    } else if (this.selectedMonth < 0) {
      this.before = 10;
      this.selectedMonth = 11;
      this.next = -1;
    }

    this.ajusteSlideForMonthChanged();
  }

  ajusteSlideForMonthChanged() {
    if (this.selectedProgram?.program.length > 0) {
      const adaptedMonth = this.selectedMonth + 1;
      this.selectedProgramMonth = null;
      this.selectedProgram?.program?.filter((bibleProgramMonth) => {
        if (bibleProgramMonth.customizedMonth.id === adaptedMonth) {
          this.selectedProgramMonth = bibleProgramMonth;
        }
      });
    } else {
      this.showMonths = false;
    }
    this.save();
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

    this.showMonths = true;

    this.setSelectedMonth();
  }

  setAsReadUnread(verseDay: VerseDay) {
    this.is_loading = true;
    this.bibleProgramUserService
      .setAsDone(this.selectedProgram?.id, verseDay)
      .then((responser) => {
        const adaptedMonth = this.selectedMonth + 1;
        let flag = true;
        this.selectedProgram?.program.filter((programDay) => {
          if (programDay?.customizedMonth?.id === adaptedMonth) {
            programDay?.verses.filter((verse) => {
              if (verse?.day === verseDay?.day) {
                verse.isRead = responser.data !== null ? true : false;
              }

              if (flag) {
                if (!verse?.isRead) {
                  flag = false;
                  this.selectedVerseDay = verse;
                }
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
    UiService.localSet(Constants.SELECTED_PROGRAM, this.selectedProgram?.id);
  }

  setPlan() {
    this.sessionPage.emit(Constants.BIBLE_PROGRAM_MENU_PLAN);
  }
}
