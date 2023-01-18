import { LongPressActionDirective } from './../../../../directives/long-press-action.directive';
/* eslint-disable @typescript-eslint/naming-convention */
import { CommentMakerComponent } from './../../../../resources/color-manager/comment-maker/comment-maker.component';
import { TutorialComponent } from '../../../tutorial/tutorial.component';
import { ExceptionService } from '../../../../services/exception-service.service';
import { UserVerseMarkService } from '../../../../services/user-verse-mark.service';
import { IonCol, Platform, PopoverController } from '@ionic/angular';
import { BibleProgramService } from '../../../../services/bible-program.service';
import { VerseDay } from '../../../../models/verseDay';
import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  OnInit,
  Output,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { Constants } from 'src/app/models/constants';
import { UiService } from 'src/app/services/ui.service';
import { VerseDayTree } from 'src/app/models/verseDayTree';
import { Verse } from 'src/app/models/verse';
import { LoginService } from 'src/app/services/login.service';
import { UserVerseMark } from 'src/app/models/userVerseMark';
import { ConstantMessages } from 'src/app/models/messages';
import { ConstantsMidia } from 'src/app/models/contantsMidia';
import { fromEvent } from 'rxjs';
import { map, distinctUntilChanged } from 'rxjs/operators';

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
  active: boolean;
  selectedVerse: Verse;
  action: any;
  DOUBLE_CLICK_THRESHOLD = 200;
  constructor(
    private bibleProgramService: BibleProgramService,
    private platform: Platform,
    private popCtrl: PopoverController,
    private userVerseMarkService: UserVerseMarkService,
    private exceptionService: ExceptionService,
    private element: ElementRef,
    private renderer: Renderer2,
    private longPress: LongPressActionDirective
  ) {}

  public onClick(event: ElementRef, verse: Verse): void {
    this.longPress.onClick();
  }

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
    this.checkEventPress();
  }

  checkEventPress() {
    UiService.scrollVerseRead.subscribe((data) => {
      this.active = data.status;
    });

    // UiService.returnColorMaker.subscribe((data) => {
    //
    //   if (data) {
    //     this.el = data.element;
    //     console.log(this.el.nativeElement);
    //     if (!this.selectedVerse?.userVerseMark) {
    //       this.selectedVerse.userVerseMark = new UserVerseMark();
    //     }
    //     if (data.color) {
    //       this.selectedVerse.userVerseMark.color = data.color;
    //       this.renderer.setStyle(
    //         this.el.nativeElement,
    //         'backgroundColor',
    //         data.color
    //       );

    //       if (data.color !== 'Yellow') {
    //         this.renderer.setStyle(this.el.nativeElement, 'color', 'white');
    //       }
    //       this.renderer.setStyle(
    //         this.el.nativeElement,
    //         'fontFamily',
    //         'Qanelas-bold'
    //       );
    //     }

    //     if (data.comment) {
    //       this.selectedVerse.userVerseMark.comment = data.comment;
    //     }

    //     if (
    //       this.selectedVerse.userVerseMark.color.length > 0 ||
    //       this.selectedVerse.userVerseMark.comment.length > 0
    //     ) {
    //       const user = LoginService.getUser();
    //       this.selectedVerse.userVerseMark.user_id = user.id;
    //       this.selectedVerse.userVerseMark.verse_id = this.selectedVerse.id;
    //       // this.userVerseMarkService.store(this.verse.userVerseMark);
    //     }
    //     this.checkResetColor();
    //   } else {
    //     this.checkResetColor();
    //   }
    // });
  }

  onWindowScroll(ev: any) {
    UiService.scrollVerseRead.emit({ status: true });
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
      component: CommentMakerComponent,
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
    console.log(this.showCheckBox);
  }

  // versePress(verse: Verse) {
  //   this.selectedVerse = verse;
  //   this.active = UiService.localGet(Constants.IS_COLOR_MANAGER_OPPENED);
  //   if (this.active) {
  //     UiService.showColorMarkEmitter.emit({ status: false });
  //     this.clearFormat();
  //   } else {
  //     this.longPressCheck();
  //   }
  // }

  // longPressCheck() {
  //   if (this.active) {
  //     clearTimeout(this.action);
  //   }
  //   this.action = setTimeout(() => {
  //     if (!this.active) {
  //       console.log(this.element.nativeElement);
  //       this.renderer.setStyle(
  //         this.el.nativeElement,
  //         'backgroundColor',
  //         'gray'
  //       );
  //       UiService.showColorMarkEmitter.emit({
  //         status: true,
  //         element: this.el,
  //       });
  //       // this.openColorMark(1);
  //     }
  //   }, this.DOUBLE_CLICK_THRESHOLD);
  // }

  // checkResetColor() {
  //   if (
  //     this.selectedVerse?.userVerseMark?.color?.length > 0 &&
  //     this.selectedVerse?.userVerseMark?.color !== Constants.COLOR_TRANSPARENT
  //   ) {
  //     this.renderer.setStyle(
  //       this.el.nativeElement,
  //       'backgroundColor',
  //       this.selectedVerse?.userVerseMark?.color
  //     );
  //   } else {
  //     this.clearFormat();
  //   }
  // }

  // clearFormat() {
  //   this.renderer.setStyle(
  //     this.element.nativeElement,
  //     'backgroundColor',
  //     Constants.COLOR_TRANSPARENT
  //   );

  //   this.renderer.setStyle(this.element.nativeElement, 'fontFamily', 'Qanelas');
  //   this.renderer.setStyle(this.element.nativeElement, 'color', 'black');
  // }
}
