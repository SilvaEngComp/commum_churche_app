import { Injectable } from '@angular/core';

import {
  PushNotification,
  PushNotificationActionPerformed,
  PushNotifications,
  PushNotificationToken,
} from '@capacitor/push-notifications';
import {
  LocalNotificationActionPerformed,
  LocalNotifications,
} from '@capacitor/local-notifications';
import { BehaviorSubject } from 'rxjs';
import { MessagingService } from './messaging.service';
import { Platform } from '@ionic/angular';
import { ExceptionService } from './exception-service.service';
import { PushNotify } from '../models/pushNotification';

@Injectable({
  providedIn: 'root',
})
export class FcmService {
  areEnabled: boolean;
  hasPermission: boolean;
  userResponse$: BehaviorSubject<string> = new BehaviorSubject(null);

  constructor(
    private exceptionService: ExceptionService,
    private platform: Platform,
    private messagingService: MessagingService
  ) {}

  async localPush() {
    const { value } = await LocalNotifications.areEnabled();
    this.areEnabled = value;

    if (this.areEnabled) {
      const { display } = await LocalNotifications.requestPermissions();
      if (display === 'granted') {
        this.hasPermission = true;
      }
    }

    LocalNotifications.registerActionTypes({
      types: [
        {
          id: 'reply',
          actions: [
            {
              id: 'reply',
              title: 'reply',
              input: true,
            },
            {
              id: 'yes',
              title: 'yes!',
            },
            {
              id: 'no',
              title: 'no.',
            },
          ],
        },
      ],
    });

    LocalNotifications.addListener(
      'localNotificationActionPerformed',
      (notificationAction: LocalNotificationActionPerformed) => {
        if (notificationAction.notification.actionTypeId === 'reply') {
          this.userResponse$.next(
            notificationAction.inputValue || notificationAction.actionId
          );
        }
      }
    );
  }

  async scaduleBasic(push: PushNotify) {
    if (!this.hasPermission) {
      alert('Você precisa permitir a norificação nas configurações');
      return;
    }

    await LocalNotifications.schedule({
      notifications: [
        {
          title: push.title,
          body: push.body,
          largeBody: push.body,
          id: 1,
          schedule: { at: new Date(Date.now() + 1000 * 5) },
          sound: push.audio,
          actionTypeId: 'yes',
          extra: {
            data: 'Acesse o App FKDEB para mais informações',
          },
        },
      ],
    });
  }

  async scaduleInput() {
    if (!this.hasPermission) {
      alert('Você precisa permitir a norificação nas configurações');
      return;
    }

    await LocalNotifications.schedule({
      notifications: [
        {
          title: 'Nova mensagem de Eliabe',
          body: 'Olá! o que está fazendo?',
          id: 1,
          sound: null,
          attachments: null,
          actionTypeId: 'reply',
          extra: null,
        },
      ],
    });
  }
  async scaduleMultiple() {
    if (!this.hasPermission) {
      alert('Você precisa permitir a norificação nas configurações');
      return;
    }

    await LocalNotifications.schedule({
      notifications: [
        {
          title: '1º',
          body: 'É a primeira notificação',
          id: 1,
          sound: null,
          attachments: null,
          extra: null,
        },
        {
          title: '2º',
          body: 'É a segunda notificação',
          id: 1,
          sound: null,
          attachments: null,
          extra: null,
        },
      ],
    });
  }

  async scaduleDelayed() {}

  public async initPush() {
    if (this.platform.is('cordova')) {
      PushNotifications.requestPermissions().then((result) => {
        if (result.receive === 'granted') {
          this.initializeFirebase();
        }
      });
    }
  }

  private initializeFirebase() {
    // registrando app
    PushNotifications.register();

    PushNotifications.addListener(
      'registration',
      (token: PushNotificationToken) => {
        // alert('Push registration success, token: ' + token.value);
        this.messagingService.store(token.value, 2);
        this.localPush();
        console.log('Push registration success, token: ' + token.value);
      }
    );

    PushNotifications.addListener('registrationError', (error: any) => {
      // alert('Push registration success, token: ' + token.value);
      console.log('Push registration error: ' + error);
    });

    PushNotifications.addListener(
      'pushNotificationReceived',
      async (notification: PushNotification) => {
        console.log('push received: ' + JSON.stringify(notification));

        // definindo o som para notificação

        const push: PushNotify = new PushNotify(
          notification.title,
          notification.body
        );

        this.scaduleBasic(push);
        this.exceptionService.pushMessage(push);
      }
    );

    // metodo chamado quando se clica na notificação
    PushNotifications.addListener(
      'pushNotificationActionPerformed',
      (notification: PushNotificationActionPerformed) => {
        const data = notification.notification.data;
        console.log(
          'Action performed: ' + JSON.stringify(notification.notification)
        );
      }
    );
  }
}
