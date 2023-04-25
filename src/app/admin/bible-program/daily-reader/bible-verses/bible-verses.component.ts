import { CustomizedMonth } from 'src/app/models/customizedMonth';
/* eslint-disable @typescript-eslint/naming-convention */
import { TutorialComponent } from '../../../tutorial/tutorial.component';
import { ExceptionService } from '../../../../services/exception-service.service';
import { Platform, PopoverController } from '@ionic/angular';
import { BibleProgramService } from '../../../../services/bible-program.service';
import { VerseDay } from '../../../../models/verseDay';
import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Constants } from 'src/app/models/constants';
import { UiService } from 'src/app/services/ui.service';
import { VerseDayTree } from 'src/app/models/verseDayTree';
import { Verse } from 'src/app/models/verse';
import { ConstantMessages } from 'src/app/models/messages';
import { ConstantsMidia } from 'src/app/models/contantsMidia';
import { BibleProgramUserService } from 'src/app/services/bible-program-user.service';

@Component({
  selector: 'app-bible-verses',
  templateUrl: './bible-verses.component.html',
  styleUrls: ['./bible-verses.component.scss'],
})
export class BibleVersesComponent implements OnInit {
  @ViewChild('mainDiv', { static: false }) mainDiv: ElementRef;
  @Output() sessionPage: EventEmitter<string> = new EventEmitter<string>();

  verseDay: VerseDay;
  text: string;
  height: string;
  verseDayTree: VerseDayTree[];
  letterSizeConfig: number;
  letterSize: string;
  letterSizeCap: string;
  letterSizeBook: string;
  showCheckBox: boolean;
  active: boolean;
  selectedVerses: Verse[];
  action: any;
  localPageTitle: string;
  customizedMonth: CustomizedMonth;
  selectedProgram: number;
  versesToRead: string;
  DOUBLE_CLICK_THRESHOLD = 200;
  is_loading: boolean;
  constructor(
    private bibleProgramService: BibleProgramService,
    private bibleProgramUserService: BibleProgramUserService,
    private platform: Platform,
    private popCtrl: PopoverController,
    private exceptionService: ExceptionService
  ) {}

  ngOnInit() {
    this.showCheckBox = false;
    UiService.localSet(
      Constants.BIBLE_PROGRAM_SUBPAGE,
      Constants.BIBLE_PROGRAM_MENU_VERSE_DAY
    );
    UiService.localSet(
      ConstantsMidia.OPPEN_TUTORIAL,
      ConstantsMidia.TUTORIAL_VERSES_READ
    );

    this.verseDay = UiService.localGet(Constants.SELECTED_VERSE_DAY);

    this.selectedProgram = UiService.localGet(Constants.SELECTED_PROGRAM);

    this.height = Math.round(this.platform.height() * 0.8) + 'px';
    this.letterSizeConfig = 12;

    this.load();
    this.checkEventPress();
  }

  checkEventPress() {
    // UiService.scrollVerseRead.subscribe((data) => {
    //   this.active = data.status;
    // });

    UiService.closeColorMarkEmitter.subscribe(() => {
      this.selectedVerses.filter((verse) => {
        this.clearFormat(verse);
      });
    });
  }

  getTexToRead() {
    this.localPageTitle = `${this.verseDay?.startVerse?.book?.abbrev}
    ${this.verseDay?.startVerse?.chapter}:${this.verseDay?.startVerse?.verse} Até ${this.verseDay?.endVerse?.book?.abbrev}
    ${this.verseDay?.endVerse?.chapter}:${this.verseDay?.endVerse?.verse}`;

    if (this?.verseDay?.month >= 0) {
      this.customizedMonth = new CustomizedMonth(
        this?.verseDay?.month - 1,
        false
      );
    }
    this.versesToRead = `Dia ${this.verseDay?.day} de
    ${this.customizedMonth?.name}`;
    UiService.localSet(Constants.TITLE_CURRENT_PAGE, this.versesToRead);
    UiService.pageTitle.emit(this.versesToRead);
    this.save();
    if (this.mainDiv) {
      this.mainDiv.nativeElement.scrollTo({ left: 0, top: 0 });
    }
  }

  save() {
    UiService.localSet(Constants.SELECTED_VERSE_DAY, this.verseDay);
  }

  async showTutorial(event: any) {
    const pop = await this.popCtrl.create({
      component: TutorialComponent,
      event,
      componentProps: { path: ConstantsMidia.TUTORIAL_VERSES_READ },
    });

    pop.present();
  }

  setLetterSize(isUpper: boolean) {
    if (this.letterSizeConfig < 5 && !isUpper) {
      this.exceptionService.alertDialog(
        'Alerta!',
        ConstantMessages.MSG_MAX_LIMIT_LETTER
      );
    }
    if (this.letterSizeConfig > 30 && isUpper) {
      this.exceptionService.alertDialog(
        'Alerta!',
        ConstantMessages.MSG_MAX_LIMIT_LETTER
      );
    }
    if (isUpper) {
      this.letterSizeConfig++;
    } else {
      this.letterSizeConfig--;
    }

    this.letterSize = this.letterSizeConfig + 'pt';
    this.letterSizeCap = this.letterSizeConfig + 2 + 'pt';
    this.letterSizeBook = this.letterSizeConfig + 5 + 'pt';
    UiService.localSet(
      Constants.USER_LETTER_SIZE_CONFIG,
      this.letterSizeConfig
    );
  }

  back() {
    this.sessionPage.emit(Constants.BIBLE_PROGRAM_MENU_READ_DAY);
  }
  async load() {
    this.is_loading = true;
    this.bibleProgramService
      .getVerse(this.verseDay?.id)
      .then((responser) => {
        this.verseDay = responser.data.verseDay;
        this.verseDayTree = responser.data.tree;
        this.getTexToRead();
      })
      .finally(() => (this.is_loading = false));
  }

  doRefresh(ev) {
    window.location.reload();
  }

  checkWhiteText(verse: Verse) {
    let flag = false;
    if (verse?.userVerseMark) {
      if (verse?.userVerseMark?.color) {
        if (verse?.userVerseMark?.color?.includes('Yellow')) {
          flag = false;
        } else if (verse?.userVerseMark?.color?.includes('transparent')) {
          flag = false;
        } else {
          flag = true;
        }
      } else {
        flag = false;
      }
    }
    return flag;
  }

  checkSelected(verse: Verse) {
    if (this.selectedVerses.indexOf(verse) >= 0) {
      return true;
    }
    return false;
  }

  removeVerse(verse) {
    const position: number = this.selectedVerses.indexOf(verse);
    this.selectedVerses.splice(position, 1);
    if (this.selectedVerses?.length === 0) {
      UiService.localRemove(Constants.SELECTED_VERSES_PRESSED);
      UiService.returnColorMaker.emit(false);
    } else {
      UiService.localSet(
        Constants.SELECTED_VERSES_PRESSED,
        this.selectedVerses
      );
    }
  }

  pressMark(verse: Verse) {
    if (!this.selectedVerses) {
      this.selectedVerses = [];
    }

    if (this.checkSelected(verse)) {
      this.clearFormat(verse);
      return;
    }

    this.selectedVerses.push(verse);
    UiService.localSet(Constants.SELECTED_VERSES_PRESSED, this.selectedVerses);
    UiService.colorMarkerVerseAdded.emit(true);
    this.longPressCheck();
  }

  longPressCheck() {
    if (this.active) {
      clearTimeout(this.action);
    }
    this.action = setTimeout(async () => {
      if (!this.active) {
        this.selectedVerses.filter((verse) => {
          document.getElementById(`${verse?.id}`).style.backgroundColor =
            'gray';
          UiService.showColorMarkEmitter.emit({
            status: true,
            verse: this.selectedVerses,
          });
        });

        this.receiveReturn();
      }
    }, this.DOUBLE_CLICK_THRESHOLD);
  }

  receiveReturn() {
    UiService.returnColorMaker.subscribe((data) => {
      if (data) {
        this.selectedVerses = data.selectedVerses;
        if (data.color) {
          if (data.color !== Constants.COLOR_TRANSPARENT) {
            this.setModifiedColor(data.color);
          }
        }
        this.checkResetColor();
      } else {
        this.checkResetColor();
        this.selectedVerses.filter((verse) => {
          this.clearFormat(verse);
        });
      }
    });
  }

  setModifiedColor(color: string) {
    this.selectedVerses.filter((verse) => {
      document.getElementById(`${verse?.id}`).style.backgroundColor = color;

      if (color !== 'Yellow') {
        document.getElementById(`${verse.id}`).style.color = 'white';
      }
      document.getElementById(`${verse.id}`).style.fontFamily = 'Qanelas-bold';
    });
    this.selectedVerses = [];
  }

  checkResetColor() {
    this.selectedVerses.filter((verse) => {
      if (
        verse?.userVerseMark?.color?.length > 0 &&
        verse?.userVerseMark?.color !== Constants.COLOR_TRANSPARENT
      ) {
        document.getElementById(`${verse?.id}`).style.backgroundColor =
          verse?.userVerseMark?.color;
      } else {
        this.clearFormat(verse);
      }
    });
    this.selectedVerses = [];
  }

  clearFormat(verse) {
    document.getElementById(`${verse?.id}`).style.fontFamily = 'Qanelas';
    document.getElementById(`${verse?.id}`).style.color = 'black';
    document.getElementById(`${verse?.id}`).style.backgroundColor =
      Constants.COLOR_TRANSPARENT;
    this.removeVerse(verse);
  }

  setAsReadUnread() {
    this.bibleProgramUserService
      .setAsDone(this.selectedProgram, this.verseDay)
      .then((responser) => {
        this.verseDay.isRead = responser.data !== null ? true : false;
        this.exceptionService.success(responser);
      });
  }

  backVerse() {
    if (this.verseDay.id - 1 >= 0) {
      this.verseDay.id = this.verseDay.id - 1;
      this.load();
    }
  }
  nextVerse() {
    if (this.verseDay.id + 1 <= 31062) {
      this.verseDay.id = this.verseDay.id + 1;
      this.load();
    }
  }
}
