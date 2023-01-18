import { CommentMakerComponent } from './comment-maker/comment-maker.component';
import { ModalController } from '@ionic/angular';
import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-color-manager',
  templateUrl: './color-manager.component.html',
  styleUrls: ['./color-manager.component.scss'],
})
export class ColorManagerComponent implements OnInit {
  @Input() element: ElementRef;
  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {
    console.log(this.element.nativeElement);
  }

  receiveReturn(data) {
    UiService.returnColorMaker.emit({
      color: data.color,
      element: this.element,
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
        element: this.element,
      });
    }
  }
}
