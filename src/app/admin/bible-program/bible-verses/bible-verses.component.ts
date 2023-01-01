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
  constructor(
    private bibleProgramService: BibleProgramService,
    private platform: Platform,
    private popCtrl: PopoverController,
    private userVerseMarkService: UserVerseMarkService
  ) {}

  ngOnInit() {
    UiService.localSet(
      Constants.BIBLE_PROGRAM_SUBPAGE,
      Constants.BIBLE_PROGRAM_MENU_VERSE_DAY
    );

    this.verseDay = UiService.localGet(Constants.SELECTED_VERSE_DAY);
    this.height = Math.round(this.platform.height() * 0.8) + 'px';
    this.load();
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
}
