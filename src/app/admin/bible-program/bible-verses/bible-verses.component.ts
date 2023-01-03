import { ExceptionService } from './../../../services/exception-service.service';
import { UserVerseMarkService } from './../../../services/user-verse-mark.service';
import { Platform, PopoverController } from '@ionic/angular';
import { BibleProgramService } from './../../../services/bible-program.service';
import { VerseDay } from './../../../models/verseDay';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Constants } from 'src/app/models/constants';
import { UiService } from 'src/app/services/ui.service';
import { VerseDayTree } from 'src/app/models/verseDayTree';
import { Verse } from 'src/app/models/verse';
import { ColorMarkerComponent } from 'src/app/directives/color-marker/color-marker.component';
import { LoginService } from 'src/app/services/login.service';
import { UserVerseMark } from 'src/app/models/userVerseMark';
import { ConstantMessages } from 'src/app/models/messages';

@Component({
  selector: 'app-bible-verses',
  templateUrl: './bible-verses.component.html',
  styleUrls: ['./bible-verses.component.scss'],
})
export class BibleVersesComponent implements OnInit {
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
  constructor(
    private bibleProgramService: BibleProgramService,
    private platform: Platform,
    private popCtrl: PopoverController,
    private userVerseMarkService: UserVerseMarkService,
    private exceptionService: ExceptionService
  ) {}

  ngOnInit() {
    this.showCheckBox = false;
    UiService.localSet(
      Constants.BIBLE_PROGRAM_SUBPAGE,
      Constants.BIBLE_PROGRAM_MENU_VERSE_DAY
    );

    this.verseDay = UiService.localGet(Constants.SELECTED_VERSE_DAY);
    this.height = Math.round(this.platform.height() * 0.8) + 'px';
    this.letterSizeConfig = 12;
    this.load();
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
    this.bibleProgramService.getVerse(this.verseDay).then((responser) => {
      this.verseDayTree = responser.data;
      console.log(this.verseDayTree[0].chapters[0].verses[0]);
    });
  }

  doRefresh(ev) {
    window.location.reload();
  }

  checkWhiteText(verse: Verse) {
    let flag = false;
    if (verse?.userVerseMark) {
      if (verse?.userVerseMark?.color.includes('Yellow')) {
        flag = false;
      } else if (verse?.userVerseMark?.color.includes('transparent')) {
        flag = false;
      } else {
        flag = true;
      }
    } else {
      flag = false;
    }

    return flag;
  }

  async openComment(
    event: any,
    verse: Verse,
    book: number,
    chapter: number,
    versePosition: number
  ) {
    if (!verse?.userVerseMark) {
      verse.userVerseMark = new UserVerseMark();
    }

    const modal = await this.popCtrl.create({
      component: ColorMarkerComponent,
      componentProps: {
        isDirective: false,
        comment: verse.userVerseMark.comment,
      },
      event,
    });

    modal.present();
    const { data } = await modal.onDidDismiss();
    if (data) {
      if (data.comment) {
        verse.userVerseMark.comment = data.comment;
      }

      if (
        verse.userVerseMark.color.length > 0 ||
        verse.userVerseMark.comment.length > 0
      ) {
        const user = LoginService.getUser();
        verse.userVerseMark.user_id = user.id;
        verse.userVerseMark.verse_id = verse.id;
        this.userVerseMarkService.store(verse.userVerseMark).then(() => {
          this.verseDayTree[book].chapters[chapter].verses[versePosition] =
            verse;
        });
      }
    }
  }

  setShowCheckBox() {
    this.showCheckBox = !this.showCheckBox;
  }
}
