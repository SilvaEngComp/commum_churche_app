/* eslint-disable @typescript-eslint/member-ordering */
import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-finish-action',
  templateUrl: './finish-action.component.html',
  styleUrls: ['./finish-action.component.scss'],
})
export class FinishActionComponent implements OnInit {
  constructor(private modalCtrl: ModalController) {}

  @Input() title: string;
  @Input() msg: string;
  @Input() duration: number;

  ngOnInit() {
    if (!this.title) {
      this.title = 'operação concluída com sucesso!';
    }
    this.starDismiss();
  }
  starDismiss() {
    setTimeout(() => {
      this.modalCtrl.dismiss();
    }, this.duration);
  }

  ok() {
    this.modalCtrl.dismiss();
  }
}
