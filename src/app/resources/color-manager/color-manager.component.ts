import { ExceptionService } from 'src/app/services/exception-service.service';
import { environment } from 'src/environments/environment';
import { Verse } from 'src/app/models/verse';
import { CommentMakerComponent } from './comment-maker/comment-maker.component';
import { ModalController, PopoverController } from '@ionic/angular';
import { Component, Input, OnInit } from '@angular/core';
import { UiService } from 'src/app/services/ui.service';
import { Share } from '@capacitor/share';
import { ClipboardService } from 'ngx-clipboard';
@Component({
  selector: 'app-color-manager',
  templateUrl: './color-manager.component.html',
  styleUrls: ['./color-manager.component.scss'],
})
export class ColorManagerComponent implements OnInit {
  @Input() verse: Verse;
  text: string;
  constructor(
    private popCtrl: PopoverController,
    private clipboardService: ClipboardService,
    private exceptionService: ExceptionService
  ) {}

  ngOnInit() {
    this.text = `${this.verse?.book} ${this.verse?.chapter}:${this.verse?.verse} ${this.verse?.text}

${environment.BASE_URL}`;
  }

  async comment() {
    const modal = await this.popCtrl.create({
      component: CommentMakerComponent,
      componentProps: { verse: this.verse },
    });

    modal.present();

    const { data } = await modal.onDidDismiss();
    if (data) {
      UiService.returnColorMaker.emit({
        verse: this.verse,
      });
    }
  }

  async share() {
    const title = `${this.verse?.book} ${this.verse?.chapter}:${this.verse?.verse}`;
    await Share.share({
      title,
      text: this.text,
      url: environment.BASE_URL,
      dialogTitle: 'Igreja Batista Nova Betel',
    });
  }

  copy() {
    this.clipboardService.copy(this.text);
    this.exceptionService.toastHandler('Texto Copiado');
  }
}
