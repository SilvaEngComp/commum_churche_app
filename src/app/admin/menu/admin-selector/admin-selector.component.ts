import { Constants } from 'src/app/models/constants';
import { ExceptionService } from './../../../services/exception-service.service';
import { LoginService } from 'src/app/services/login.service';
import { UiService } from 'src/app/services/ui.service';
import {
  Platform,
  IonContent,
  IonRefresher,
  PopoverController,
} from '@ionic/angular';
import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from 'src/app/models/User';
import { Router } from '@angular/router';
import { MessagingService } from 'src/app/services/messaging.service';
import { PushNotify } from 'src/app/models/pushNotification';
import { FcmService } from 'src/app/services/fcm.service';
import { ConstantsMidia } from 'src/app/models/contantsMidia';
import { TutorialComponent } from '../../tutorial/tutorial.component';

@Component({
  selector: 'app-admin-selector',
  templateUrl: './admin-selector.component.html',
  styleUrls: ['./admin-selector.component.scss'],
})
export class AdminSelectorComponent implements OnInit {
  @ViewChild('mainSmall', { static: false }) ionContent: IonContent;
  isLarge: boolean;
  user: User;
  page: string;
  defaultPageName = 'menu-admin-page';

  isBibleOppened: boolean;

  constructor(
    private exceptionService: ExceptionService,
    private platform: Platform,
    private router: Router,
    private messagingService: MessagingService,
    private fcmService: FcmService
  ) {}

  ngOnInit() {
    this.isLarge = this.platform.width() > 500;
    this.user = LoginService.getUser();
    this.page = UiService.localGet(this.defaultPageName);

    if (!UiService.checkValidPage(this.page)) {
      this.page = '0';
    } else {
      this.page = String(this.page);
    }

    if (!this.platform.is('cordova')) {
      this.requestPermission();
    } else {
      this.fcmService.initPush();
    }

    UiService.pageTitle.subscribe((title: string) => {
      if (title.toLocaleLowerCase().includes('dia')) {
        this.isBibleOppened = true;
      } else {
        this.isBibleOppened = false;
      }
    });
  }

  listenForMessages() {
    this.messagingService.getMessages().subscribe(
      async (msg: any) => {
        // console.log('NEW MESSAGE: ', msg);
        const push: PushNotify = new PushNotify(
          msg.notification.title,
          msg.notification.body,
          msg.notification.icon,
          msg.notification.click_action
        );
        // this.exceptionService.onSuccess(msg);
        this.exceptionService.pushMessage(push);
      },
      async (err) => {
        this.exceptionService.alertDialog(err, 'Erro!');
      }
    );
  }

  requestPermission() {
    this.messagingService.requestPermission().subscribe(
      async (token) => {
        this.listenForMessages();
      },
      async (err) => {
        this.exceptionService.alertDialog(err, 'Erro!');
      }
    );
  }

  onSelectPage(page: any) {
    if (page < -1) {
      caches
        .keys()
        .then((keyList) =>
          Promise.all(keyList.map((key) => caches.delete(key)))
        );
      localStorage.clear();
      this.router.navigate(['home']);
    } else {
      this.setPage(page);
    }
  }

  setPage(page: any) {
    this.page = String(page);
    this.save();
  }
  save() {
    UiService.localSet(this.defaultPageName, this.page);
  }

  doRefresh(ev, ionRefresh: IonRefresher) {
    setTimeout(() => {
      if (!this.isBibleOppened) {
        window.location.reload();
      } else {
        ionRefresh.complete();
      }
    }, 500);
  }
}
