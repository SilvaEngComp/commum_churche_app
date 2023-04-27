import { environment } from 'src/environments/environment';
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/naming-convention */
import {
  Component,
  OnInit,
  ViewChild,
  Output,
  EventEmitter,
} from '@angular/core';
import { Platform, IonTabs } from '@ionic/angular';
import { Constants } from 'src/app/models/constants';
import { PushNotify } from 'src/app/models/pushNotification';
import { ExceptionService } from 'src/app/services/exception-service.service';
import { MessagingService } from 'src/app/services/messaging.service';
import { UiService } from 'src/app/services/ui.service';
import { Share } from '@capacitor/share';
@Component({
  selector: 'app-menu-home-small',
  templateUrl: './menu-home-small.component.html',
  styleUrls: ['./menu-home-small.component.scss'],
})
export class MenuHomeSmallComponent implements OnInit {
  @Output() selectedPage: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('tabHome', { static: false }) tab!: IonTabs;

  isTest: boolean;
  showInstall: boolean;
  constructor(
    private platform: Platform,
    private exceptionService: ExceptionService,
    private messagingService: MessagingService
  ) {}

  ngOnInit() {
    this.isTest = environment.TEST;

    this.showInstall = this.platform.is('mobileweb');
  }

  async share() {
    await Share.share({
      title: 'App Igreja Batista Nova Betel',
      text: `Venha conhecer nosso APP...
"Discipulado, um estilo de vida!"`,
      url: environment.BASE_URL,
      dialogTitle: 'Igreja Batista Nova Betel',
    });
  }

  async setPage(page: number) {
    this.selectedPage.emit(page);
  }
  requestPermission() {
    this.messagingService.requestPermission().subscribe(
      async () => {
        this.listenForMessages();
      },
      async (err) => {
        this.exceptionService.alertDialog(err, 'Erro!');
      }
    );
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
}
