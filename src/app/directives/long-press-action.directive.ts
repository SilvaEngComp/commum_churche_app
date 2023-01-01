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
import { ColorMarkerComponent } from './color-marker/color-marker.component';
import { Verse } from '../models/verse';
import { UserVerseMark } from '../models/userVerseMark';

@Directive({
  selector: '[appLongPressAction]',
})
export class LongPressActionDirective implements AfterViewInit {
  @Output() pressed: EventEmitter<Verse> = new EventEmitter<Verse>();
  @Input() verse: Verse;
  private active: boolean;
  private action: any;

  constructor(
    private gestureCtrl: GestureController,
    private el: ElementRef,
    private modalCtrl: PopoverController,
    private renderer: Renderer2,
    private userVerseMarkService: UserVerseMarkService
  ) {}

  ngAfterViewInit(): void {
    console.log('initiated');
    this.initGesture();
  }

  async initGesture() {
    const gesture = await this.gestureCtrl.create(
      {
        el: this.el.nativeElement,
        gestureName: 'long-press',
        threshold: 0,
        onStart: (ev) => {
          this.active = true;
          this.longPressCheck();
        },
        onEnd: (ev) => {
          this.active = false;
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
      if (this.active) {
        this.openColorMark(1);
      }
    }, 500);
  }

  async openColorMark(event: any) {
    const modal = await this.modalCtrl.create({
      component: ColorMarkerComponent,
      componentProps: {
        isDirective: true,
      },
      event,
    });

    modal.present();
    const { data } = await modal.onDidDismiss();

    if (data) {
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
    }
  }
}
