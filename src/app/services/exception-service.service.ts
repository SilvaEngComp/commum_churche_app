import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import {
  ToastController,
  LoadingController,
  AlertController,
  ModalController,
  Platform,
} from '@ionic/angular';
import { FinishActionComponent } from '../ui/finish-action/finish-action.component';
// import { SocialAuthService } from 'angularx-social-login';
import { UiService } from './ui.service';
import { PushNotify } from '../models/pushNotification';
import { Responser } from '../models/responser';
// import { NotificationsService } from 'angular2-notifications';

@Injectable({
  providedIn: 'root',
})
export class ExceptionService {
  constructor(
    private modalCtrl: ModalController,
    private toastCtrl: ToastController,
    private loadCtrl: LoadingController,
    private alertCtrl: AlertController,
    // private notiWeb: NotificationsService,
    private platform: Platform
  ) {}

  async openLoading(
    title: string,
    msg: string = '',
    icon: boolean = true,
    duration: number = 2,
    reload?: boolean
  ) {
    const modal = await this.modalCtrl.create({
      component: FinishActionComponent,
      cssClass: 'modal-model',
      componentProps: { title, msg, icon, duration },
    });
    await modal.present();

    if (reload) {
      modal.onWillDismiss().then(() => window.location.reload());
    }
  }

  async pushMessage(msg: PushNotify) {
    console.log(msg.click_action);
    const audio = new Audio(msg.audio);

    if (msg.click_action) {
      if (msg.click_action.chatConfig.audio) {
        audio.play();
      }
    } else {
      audio.play();
    }

    if (msg.click_action) {
      if (!msg.click_action.delete) {
        const toast = await this.toastCtrl.create({
          header: msg.title,
          message: msg.body,
          mode: 'ios',
          duration: 2000,

          buttons: [
            {
              icon: 'chatbubbles-outline',
              text: 'OK',
              handler: () => {
                if (msg.click_action) {
                  if (msg.click_action.page) {
                    UiService.pageMenu.emit(msg.click_action.page);
                  }
                  UiService.emitirTo.emit(msg.click_action.chatConfig.sender);
                }
              },
            },
          ],
        });

        toast.present();
      } else {
        if (localStorage.getItem(environment.LOCALSTORAGE + 'to')) {
          if (
            JSON.parse(localStorage.getItem(environment.LOCALSTORAGE + 'to'))
              .id === msg.click_action.chatConfig.sender.id
          ) {
            UiService.emitirTo.emit(msg.click_action.chatConfig.sender);
            return;
          }
        }
      }
    } else {
      const toast = await this.toastCtrl.create({
        header: msg.title,
        message: msg.body,
        mode: 'ios',
        duration: 2000,

        buttons: [
          {
            icon: 'chatbubbles-outline',
            text: 'OK',
            handler: () => {},
          },
        ],
      });

      toast.present();
    }

    UiService.emitirRefreshUserChat.emit(msg.click_action.chatConfig.sender);
  }

  async alertDialog(message: string, header: string = '', exit?: boolean) {
    const toast = await this.alertCtrl.create({
      header,
      message,
      mode: 'ios',
      buttons: [
        {
          text: 'OK',
          handler: () => {
            if (exit) {
            }
          },
        },
      ],
    });

    return toast.present();
  }

  async toastHandler(message: string, duration = 2000) {
    const toast = await this.toastCtrl.create({
      message,
      duration,
    });

    return toast.present();
  }

  success(resp: Responser) {
    if (resp.message) {
      this.toastHandler(resp.message);
    } else {
      this.toastHandler('Operação realizada com sucesso!');
    }

    // this.loadCtrl.dismiss();
  }
  error(err: any) {
    if (err) {
      switch (err.status) {
        case 400:
          this.alertDialog(err.error.message, 'Erro!');
          break;
        case 401:
          this.alertDialog('Sessão Expridada', 'Erro!');
          break;
        case 403:
          this.alertDialog('Login ou senha incorretos', 'Erro!');
          break;
        case 413:
          this.alertDialog('O arquivo é muito grande! Tente outro', 'Erro!');
          break;
        default:
          if (err.error) {
            this.alertDialog(err.error.message, 'Erro!');
          }

          break;
      }

      // const data = err.error.data;
      // console.log(data);
      // console.log(Array.isArray(data));
      // if (data) {
      //   if (Array.isArray(data)) {
      //     data.filter((obj) => this.alertDialog(obj, 'Erro!'));
      //   }
      // }
    } else {
      this.alertDialog('Erro Desconhecido', 'Erro!');
    }
  }

  async loadingFunction(msg: string = 'Aguarde um instante...') {
    const loading = await this.loadCtrl.create({
      message: msg,
      translucent: true,
      backdropDismiss: true,
      duration: 2000,
    });
    await loading.present();
  }
}
