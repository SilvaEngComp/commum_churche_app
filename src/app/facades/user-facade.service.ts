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
    this.localName = environment.LOCAL_USER;
  }

  load(role: string = 'customer') {
    this.role = role;
    this.geRepository();
  }

  getLocal() {
    let response;
    if (this.role === 'customer') {
      response = UiService.localGet(this.localName);
    } else {
      response = UiService.localGet(this.localSellers);
    }
    if (response) {
      this.dataLoaded.emit(response);
      return UiService.getHash(response);
    }
    return null;
  }
  async geRepository() {
    const lastHash = this.getLocal();

    const filter = new UserFilter(this.role);
    const response = await this.userService.get(filter);
    if (response) {
      const users = response.filter((user) => {
        if (user.roles.indexOf('owner') >= 0 && this.role === 'seller') {
          return user;
        }
        if (user.roles.indexOf(this.role) >= 0) {
          return user;
        }
      });

      if (this.role === 'customer') {
        UiService.validlocalSet(users, this.localName, lastHash);
      }
      this.dataLoaded.emit(users);
    }
  }

  searchUser(name: string) {
    const users = UiService.localGet(this.localName);
    return users.filter((cliente) =>
      cliente.name.toLowerCase().includes(name.toLowerCase())
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
                this.load(this.role);
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
