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

  @Input() msg: string;
  ngOnInit() {
    if (!this.msg) {
      this.msg = 'operação concluída com sucesso!';
    }
    this.starDismiss();
  }
  starDismiss() {
    setTimeout(() => {
      this.modalCtrl.dismiss();
    }, 2000);
  }
}

