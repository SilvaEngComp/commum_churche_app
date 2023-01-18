import { UiService } from 'src/app/services/ui.service';
/* eslint-disable @typescript-eslint/naming-convention */
import { LoginService } from './../services/login.service';
import { UserVerseMarkService } from './../services/user-verse-mark.service';
import {
  Directive,
  ElementRef,
  AfterViewInit,
  EventEmitter,
  Output,
  Input,
  Renderer2,
} from '@angular/core';
import { GestureController, PopoverController } from '@ionic/angular';
import { Verse } from '../models/verse';
import { UserVerseMark } from '../models/userVerseMark';
import { Constants } from '../models/constants';

@Directive({
  selector: '[appLongPressAction]',
})
export class LongPressActionDirective implements AfterViewInit {
  @Output() pressed: EventEmitter<Verse> = new EventEmitter<Verse>();
  @Input() verse: Verse;
  private active: boolean;
  private action: any;
  private DOUBLE_CLICK_THRESHOLD = 200;

  constructor(
    private gestureCtrl: GestureController,
    private el: ElementRef,
    private renderer: Renderer2,
    private userVerseMarkService: UserVerseMarkService
  ) {}

  ngAfterViewInit(): void {
    console.log('initiated');
    this.initGesture();
    UiService.scrollVerseRead.subscribe((data) => {
      this.active = data.status;
    });
  }

  onClick() {
    this.active = UiService.localGet(Constants.IS_COLOR_MANAGER_OPPENED);
    if (this.active) {
      UiService.showColorMarkEmitter.emit({ status: false });
      this.clearFormat();
    } else {
      this.longPressCheck();
    }
  }

  async initGesture() {
    console.log('initiated');

    const gesture = await this.gestureCtrl.create(
      {
        el: this.el.nativeElement,
        gestureName: '',
        threshold: 0,
        onStart: () => {
          this.active = UiService.localGet(Constants.IS_COLOR_MANAGER_OPPENED);
          if (this.active) {
            UiService.showColorMarkEmitter.emit({ status: false });
            this.clearFormat();
          } else {
            this.longPressCheck();
          }
        },
        onEnd: () => {
          UiService.showColorMarkEmitter.emit({ status: false });
          // UiService.returnColorMaker.unsubscribe();
        },
      },
      true
    );

    gesture.enable();
  }

  longPressCheck() {
    if (this.active) {
      clearTimeout(this.action);
    }
    this.action = setTimeout(async () => {
      if (!this.active) {
        console.log(this.el.nativeElement);
        this.renderer.setStyle(
          this.el.nativeElement,
          'backgroundColor',
          'gray'
        );
        UiService.showColorMarkEmitter.emit({
          status: true,
          verse: this.verse,
        });
        this.receiveReturn();
      }
    }, this.DOUBLE_CLICK_THRESHOLD);
  }

  receiveReturn() {
    let isReceived = false;
    UiService.returnColorMaker.subscribe((data) => {
      if (!isReceived) {
        isReceived = true;
        if (data) {
          // this.el = data.element;
          // console.log(this.el.nativeElement);
          if (!this.verse?.userVerseMark) {
            this.verse.userVerseMark = new UserVerseMark();
          }
          if (data.color) {
            this.verse.userVerseMark.color = data.color;
            this.renderer.setStyle(
              this.el.nativeElement,
              'backgroundColor',
              data.color
            );

            if (data.color !== 'Yellow') {
              this.renderer.setStyle(this.el.nativeElement, 'color', 'white');
            }
            this.renderer.setStyle(
              this.el.nativeElement,
              'fontFamily',
              'Qanelas-bold'
            );
          }

          if (data.comment) {
            this.verse.userVerseMark.comment = data.comment;
          }

          if (
            this.verse.userVerseMark.color.length > 0 ||
            this.verse.userVerseMark.comment.length > 0
          ) {
            const user = LoginService.getUser();
            this.verse.userVerseMark.user_id = user.id;
            this.verse.userVerseMark.verse_id = this.verse.id;
            this.userVerseMarkService.store(this.verse.userVerseMark);
          }
          this.checkResetColor();
        } else {
          this.checkResetColor();
        }
      }
    });
  }

  checkResetColor() {
    if (
      this.verse?.userVerseMark?.color?.length > 0 &&
      this.verse?.userVerseMark?.color !== Constants.COLOR_TRANSPARENT
    ) {
      this.renderer.setStyle(
        this.el.nativeElement,
        'backgroundColor',
        this.verse?.userVerseMark?.color
      );
    } else {
      this.clearFormat();
    }
  }

  clearFormat() {
    this.renderer.setStyle(
      this.el.nativeElement,
      'backgroundColor',
      Constants.COLOR_TRANSPARENT
    );

    this.renderer.setStyle(this.el.nativeElement, 'fontFamily', 'Qanelas');
    this.renderer.setStyle(this.el.nativeElement, 'color', 'black');
  }
}
