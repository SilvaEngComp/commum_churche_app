import { Component, Input, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ConstantMessages } from 'src/app/models/messages';
import { Tithe } from 'src/app/models/tithe';

@Component({
  selector: 'app-tithe-view-table',
  templateUrl: './tithe-view-table.component.html',
  styleUrls: ['./tithe-view-table.component.scss'],
})
export class TitheViewTableComponent implements OnInit {
  @Input() datas: Tithe[];
  @Input() isTithe: boolean;
  headTitheList: string[] = ['', 'valor', 'Data'];
  constructor(private alertCtrl: AlertController) {}

  ngOnInit() {
    if (this.isTithe) {
      this.headTitheList.push('Dizimista');
    } else {
      this.headTitheList.push('Ofertante');
    }
    this.headTitheList.push('');
  }

  async delete(tithe: Tithe) {
    const position = this.datas.indexOf(tithe);

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
}
