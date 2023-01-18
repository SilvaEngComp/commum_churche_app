import { environment } from 'src/environments/environment';
import { Verse } from 'src/app/models/verse';
import { CommentMakerComponent } from './comment-maker/comment-maker.component';
import { ModalController } from '@ionic/angular';
import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { UiService } from 'src/app/services/ui.service';
import { Share } from '@capacitor/share';
@Component({
  selector: 'app-color-manager',
  templateUrl: './color-manager.component.html',
  styleUrls: ['./color-manager.component.scss'],
})
export class ColorManagerComponent implements OnInit {
  @Input() verse: Verse;
  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {
    console.log(this.verse);
  }

  receiveReturn(data) {
    UiService.returnColorMaker.emit({
      color: data.color,
    });
  }

  async comment() {
    const modal = await this.modalCtrl.create({
      component: CommentMakerComponent,
    });

    modal.present();

    const { data } = await modal.onDidDismiss();
    if (data) {
      UiService.returnColorMaker.emit({
        comment: data?.comment,
      });
    }
  }

  async share() {
    const title = `${this.verse?.book} ${this.verse?.chapter}:${this.verse?.verse}`;
    await Share.share({
      title,
      text: this.verse?.text,
      url: environment.BASE_URL,
      dialogTitle: 'Igreja Batista Nova Betel',
    });
  }
}
