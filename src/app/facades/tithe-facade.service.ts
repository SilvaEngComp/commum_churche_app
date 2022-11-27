/* eslint-disable constructor-super */
/* eslint-disable @typescript-eslint/member-ordering */
import { EventEmitter, Injectable, Output } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { TitheRegisterComponent } from '../admin/financy/tithe/tithe-register/tithe-register.component';
import { Constants } from '../models/constants';
import { Responser } from '../models/responser';
import { Tithe } from '../models/tithe';
import { ExceptionService } from '../services/exception-service.service';
import { TitheService } from '../services/tithe.service';
import { UiService } from '../services/ui.service';
import { FacadeService } from './facade.service';

@Injectable({
  providedIn: 'root',
})
export class TitheFacade extends FacadeService {
  role: string;
  @Output() dataLoaded = new EventEmitter<any>();
  localName: string;
  localSellers: string;

  isModalOpen: boolean;
  constructor(
    protected titheService: TitheService,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    protected exceptionService: ExceptionService
  ) {
    super(titheService, exceptionService);
    this.localName = Constants.LOCAL_TITHE;
  }

  load() {
    this.geRepository();
  }

  async geRepository() {
    const filter = UiService.localGet(Constants.TITHE_FILTER);

    const response = await this.titheService.get(filter);
    UiService.localSet(this.localName, response.data);
    this.dataLoaded.emit(response);
  }

  searchTithe(name: string) {
    const tithes = UiService.localGet(this.localName);
    return tithes.filter((cliente) =>
      cliente.name.toLowerCase().includes(name.toLowerCase())
    );
  }

  async registerTithe(isNew: boolean = true, tithe?: Tithe) {
    if (!this.isModalOpen) {
      const modal = await this.modalCtrl.create({
        component: TitheRegisterComponent,
        componentProps: { isNew, tithe },
      });

      this.isModalOpen = true;
      await modal.present();

      modal.onDidDismiss().then(() => {
        this.load();
        this.isModalOpen = false;
      });
    }
  }

  async delete(tithe: Tithe) {
    const alert = await this.alertCtrl.create({
      message: 'Tem certeza que deseja exlcuir o dízimo ?',
      mode: 'ios',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'danger',
          handler: () => {},
        },
        {
          text: 'Ok',
          cssClass: 'success',
          handler: () => {
            this.titheService
              .delete(tithe)
              .then((responser: Responser) => {
                this.load();
                this.exceptionService.success(responser);
              })
              .catch((error) => this.exceptionService.error(error));
          },
        },
      ],
    });

    await alert.present();
  }
}
