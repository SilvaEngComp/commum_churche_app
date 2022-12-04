/* eslint-disable @typescript-eslint/member-ordering */
import { EventEmitter, Injectable, Output } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { CaixaRegisterComponent } from '../admin/financy/caixa/caixa-register/caixa-register.component';
import { Caixa } from '../models/caixa';
import { Constants } from '../models/constants';
import { Responser } from '../models/responser';
import { CaixaService } from '../services/caixa.service';
import { ExceptionService } from '../services/exception-service.service';
import { UiService } from '../services/ui.service';
import { FacadeService } from './facade.service';

@Injectable({
  providedIn: 'root',
})
export class CaixaFacadeService extends FacadeService {
  role: string;
  @Output() dataLoaded = new EventEmitter<any>();
  localName: string;
  localSellers: string;

  isModalOpen: boolean;
  constructor(
    protected caixaService: CaixaService,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    protected exceptionService: ExceptionService
  ) {
    super(caixaService, exceptionService);
    this.localName = Constants.LOCAL_CAIXA;
  }

  load() {
    this.geRepository();
  }

  async geRepository() {
    const filter = UiService.localGet(Constants.CAIXA_FILTER);

    const response = await this.caixaService.get(filter);
    UiService.localSet(this.localName, response.data);
    this.dataLoaded.emit(response);
  }

  searchCaixa(name: string) {
    const caixas = UiService.localGet(this.localName);
    return caixas.filter((cliente) =>
      cliente.name.toLowerCase().includes(name.toLowerCase())
    );
  }

  async registerCaixa(isNew: boolean = true, caixa?: Caixa) {
    if (!this.isModalOpen) {
      const modal = await this.modalCtrl.create({
        component: CaixaRegisterComponent,
        componentProps: { isNew, caixa },
      });

      this.isModalOpen = true;
      await modal.present();

      modal.onDidDismiss().then(() => {
        this.load();
        this.isModalOpen = false;
      });
    }
  }

  async delete(caixa: Caixa) {
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
            this.caixaService
              .delete(caixa)
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
