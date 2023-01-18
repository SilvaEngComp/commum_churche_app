import { UiService } from 'src/app/services/ui.service';
/* eslint-disable @typescript-eslint/naming-convention */
import { LoginService } from './../services/login.service';
import { UserVerseMarkService } from './../services/user-verse-mark.service';
import {
  Directive,
  ElementRef,
  AfterViewInit,
  Input,
  Renderer2,
} from '@angular/core';
import { GestureController } from '@ionic/angular';
import { Verse } from '../models/verse';
import { UserVerseMark } from '../models/userVerseMark';
import { Constants } from '../models/constants';

@Directive({
  selector: '[appLongPressAction]',
})
export class LongPressActionDirective implements AfterViewInit {
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
    this.initGesture();
    UiService.scrollVerseRead.subscribe((data) => {
      this.active = data.status;
    });
  }

  async initGesture() {
    const gesture = await this.gestureCtrl.create(
      {
        el: this.el.nativeElement,
        gestureName: '',
        threshold: 0,
        onStart: () => {
          this.active = UiService.localGet(Constants.IS_COLOR_MANAGER_OPPENED);
          if (this.active) {
            UiService.showColorMarkEmitter.emit({
              status: false,
              renderer: this.renderer,
            });
            this.clearFormat();
            this.checkResetColor();
          } else {
            this.longPressCheck();
          }
        },
        onEnd: () => {
          UiService.showColorMarkEmitter.emit({ status: false });
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
          this.verse = data.verse;
          if (data.color) {
            if (data.color !== Constants.COLOR_TRANSPARENT) {
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
          }
          if (data.renderer) {
            this.renderer = this.renderer;
          }

          this.checkResetColor();
        } else {
          this.checkResetColor();
          this.clearFormat();
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
