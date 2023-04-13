import { Component, Input, OnInit } from '@angular/core';
import { ActionSheetController, AlertController } from '@ionic/angular';
import { Caixa } from 'src/app/models/caixa';
import { ConstantMessages } from 'src/app/models/messages';

@Component({
  selector: 'app-caixa-view-table',
  templateUrl: './caixa-view-table.component.html',
  styleUrls: ['./caixa-view-table.component.scss'],
})
export class CaixaViewTableComponent implements OnInit {
  @Input() datas: Caixa[];

  headCaixaList: string[] = ['', 'VALOR', 'DATA', 'CATEGORIA', 'SUBCATEGORIA'];
  constructor(
    private actionSheetCtrl: ActionSheetController,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {}

  async delete(caixa: Caixa) {
    const position = this.datas.indexOf(caixa);
    if (position >= 0) {
      const alert = await this.alertCtrl.create({
        message: ConstantMessages.CONFIRM_DELETE,
        buttons: [
          {
            text: 'NÃo',
            handler: () => {},
          },
          {
            text: 'SIM',
            handler: () => {
              this.datas.splice(position, 1);
            },
          },
        ],
      });
      alert.present();
    }
  }
  async openDescription(caixa: Caixa) {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Descrição',
      subHeader: caixa?.description,

      buttons: [
        {
          text: 'ok',
          data: {
            action: () => {},
          },
        },
      ],
    });

    await actionSheet.present();
  }
}
