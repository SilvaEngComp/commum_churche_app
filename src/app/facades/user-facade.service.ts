import { Responser } from './../models/responser';
import { ExceptionService } from 'src/app/services/exception-service.service';
import { UserFilter } from 'src/app/models/userFilter';
import { ModalController, AlertController } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';
/* eslint-disable @typescript-eslint/member-ordering */
import { FacadeService } from './facade.service';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { UiService } from '../services/ui.service';
import { User } from '../models/User';
import { environment } from 'src/environments/environment';
import { UserRegisterComponent } from '../admin/user/user-register/user-register.component';
import { Constants } from '../models/constants';

@Injectable({
  providedIn: 'root',
})
export class UserFacadeService extends FacadeService {
  role: string;
  @Output() dataLoaded = new EventEmitter<any>();
  localName: string;
  localSellers: string;

  isModalOpen: boolean;
  constructor(
    protected userService: UserService,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    protected exceptionService: ExceptionService
  ) {
    super(userService, exceptionService);
    this.localName = Constants.LOCAL_USER;
  }

  load() {
    this.geRepository();
  }

  async geRepository() {
    const filter = UiService.localGet(Constants.USER_FILTER);

    const response = await this.userService.get(filter);
    UiService.localSet(this.localName, response.data);
    this.dataLoaded.emit(response);
  }

  searchUser(name: string) {
    const users = UiService.localGet(this.localName);
    return users.filter((cliente) =>
      UiService.stringNormalization(cliente.name).includes(
        UiService.stringNormalization(name)
      )
    );
  }

  async registerUser(isCorderCustomer: boolean = false) {
    if (!this.isModalOpen) {
      const modal = await this.modalCtrl.create({
        component: UserRegisterComponent,
        componentProps: { op: 'user-new', role: 'customer', isCorderCustomer },
      });

      this.isModalOpen = true;
      await modal.present();

      modal.onDidDismiss().then(() => {
        this.load();
        this.isModalOpen = false;
      });
    }
  }

  async delete(user: User) {
    const alert = await this.alertCtrl.create({
      message: 'Tem certeza que deseja exlcuir o usuário ' + user.name + '?',
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
            this.userService
              .delete(user)
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
