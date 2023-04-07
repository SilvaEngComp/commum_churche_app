/* eslint-disable max-len */
import { ExceptionService } from 'src/app/services/exception-service.service';
import { environment } from 'src/environments/environment';
import { Verse } from 'src/app/models/verse';
import { CommentMakerComponent } from './comment-maker/comment-maker.component';
import { ModalController, PopoverController } from '@ionic/angular';
import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { UiService } from 'src/app/services/ui.service';
import { Share } from '@capacitor/share';
import { ClipboardService } from 'ngx-clipboard';
import { Constants } from 'src/app/models/constants';
@Component({
  selector: 'app-color-manager',
  templateUrl: './color-manager.component.html',
  styleUrls: ['./color-manager.component.scss'],
})
export class ColorManagerComponent implements OnInit, AfterViewInit {
  selectedVerses: Verse[];
  title: string;
  text: string;
  isThereOne: boolean;
  constructor(
    private popCtrl: PopoverController,
    private clipboardService: ClipboardService,
    private exceptionService: ExceptionService
  ) {}
  ngAfterViewInit(): void {
    UiService.colorMarkerVerseAdded.subscribe(() => {
      this.selectedVerses = UiService.localGet(
        Constants.SELECTED_VERSES_PRESSED
      );

      this.isThereOne = this.selectedVerses?.length === 1;
    });
  }

  ngOnInit() {
    this.selectedVerses = UiService.localGet(Constants.SELECTED_VERSES_PRESSED);

    this.isThereOne = this.selectedVerses?.length === 1;
  }

  async comment() {
    const modal = await this.popCtrl.create({
      component: CommentMakerComponent,
      componentProps: { verse: this.selectedVerses[0] },
    });

    modal.present();

    const { data } = await modal.onDidDismiss();
    if (data) {
      UiService.returnColorMaker.emit({
        selectedVerses: this.selectedVerses,
      });
    }
  }
  close() {
    UiService.closeColorMarkEmitter.emit(false);
  }
  getTextVeses() {
    if (this.isThereOne) {
      this.title = `${this.selectedVerses[0]?.book?.name} ${this.selectedVerses[0]?.chapter}:${this.selectedVerses[0]?.verse}`;
    } else {
      const lastPosition = this.selectedVerses.length - 1;
      this.title = `${this.selectedVerses[0]?.book?.name} ${this.selectedVerses[0]?.chapter}:${this.selectedVerses[0]?.verse}-${this.selectedVerses[lastPosition]?.verse}`;
    }
    this.text = this.title;
    this.selectedVerses.filter((verse) => {
      this.text += `\n ${verse?.verse}. ${verse?.text}`;
    });

    this.text += `\n\n ${environment.BASE_URL}`;
  }
  async share() {
    this.getTextVeses();
    console.log(this.text);
    await Share.share({
      title: this.title,
      text: this.text,
      url: environment.BASE_URL,
      dialogTitle: 'Igreja Batista Nova Betel',
    });
  }

  copy() {
    this.getTextVeses();
    this.clipboardService.copy(this.text);
    this.exceptionService.toastHandler('Texto Copiado');
  }
}
