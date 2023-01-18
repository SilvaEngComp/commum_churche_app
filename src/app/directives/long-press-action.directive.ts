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
  RendererFactory2,
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
  constructor() // private renderer: Renderer2, // private el: ElementRef, // private gestureCtrl: GestureController,
  // private userVerseMarkService: UserVerseMarkService
  {}

  ngAfterViewInit(): void {
    UiService.scrollVerseRead.subscribe((data) => {
      this.active = data.status;
    });
  }

  // onclick() {
  //   this.active = UiService.localGet(Constants.IS_COLOR_MANAGER_OPPENED);
  //   console.log(this.active);
  //   if (this.active) {
  //     UiService.showColorMarkEmitter.emit({
  //       status: false,
  //       // renderer: this.renderer,
  //     });
  //     console.log('cleaning format');
  //     this.clearFormat();
  //     this.checkResetColor();
  //   } else {
  //     this.longPressCheck();
  //   }
  // }

  // longPressCheck() {
  //   if (this.active) {
  //     clearTimeout(this.action);
  //   }
  //   this.action = setTimeout(async () => {
  //     if (!this.active) {
  //       UiService.showColorMarkEmitter.emit({
  //         status: true,
  //         verse: this.verse,
  //       });
  //       this.receiveReturn();
  //     }
  //   }, this.DOUBLE_CLICK_THRESHOLD);
  // }

  // receiveReturn() {
  //   let isReceived = false;
  //   UiService.returnColorMaker.subscribe((data) => {
  //     if (!isReceived) {
  //       isReceived = true;
  //       if (data) {
  //         this.verse = data.verse;
  //         if (data.color) {
  //           if (data.color !== Constants.COLOR_TRANSPARENT) {
  //             document.getElementById(`${verse?.id}`).style.backgroundColor =
  //               data.color;

  //             if (data.color !== 'Yellow') {
  //               document.getElementById(`${verse?.id}`).style.color = 'white';
  //             }
  //             document.getElementById(`${verse?.id}`).style.fontFamily =
  //               'Qanelas-bold';
  //           }
  //         }
  //         // if (data.renderer) {
  //         //   this.renderer = this.renderer;
  //         // }

  //         this.checkResetColor();
  //       } else {
  //         this.checkResetColor();
  //         this.clearFormat();
  //       }
  //     } else {
  //       this.checkResetColor();
  //       this.clearFormat();
  //     }
  //   });
  // }

  // checkResetColor() {
  //   if (
  //     this.verse?.userVerseMark?.color?.length > 0 &&
  //     this.verse?.userVerseMark?.color !== Constants.COLOR_TRANSPARENT
  //   ) {
  //     document.getElementById(`${verse?.id}`).style.backgroundColor =
  //       this.verse?.userVerseMark?.color;
  //   } else {
  //     this.clearFormat();
  //   }
  // }

  // clearFormat() {
  //   document.getElementById(`${this.verse?.id}`).style.fontFamily = 'Qanelas';
  //   document.getElementById(`${this.verse?.id}`).style.color = 'black';
  //   document.getElementById(`${this.verse?.id}`).style.backgroundColor =
  //     Constants.COLOR_TRANSPARENT;
  // }
}
