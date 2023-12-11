import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Share } from '@capacitor/share';
import { IonMenu, IonTabs, Platform } from '@ionic/angular';
import { Constants } from 'src/app/models/constants';
import { Menu } from 'src/app/models/menu';
import { PushNotify } from 'src/app/models/pushNotification';
import { ExceptionService } from 'src/app/services/exception-service.service';
import { MessagingService } from 'src/app/services/messaging.service';
import { UiService } from 'src/app/services/ui.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
})
export class SideMenuComponent implements OnInit {
  @Output() selectedPage: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('menuSide', { static: false }) menuSide!: IonMenu;
  isTest: boolean;
  showInstall: boolean;
  pageTile: string;
  constructor(
    private platform: Platform,
    private exceptionService: ExceptionService,
    private messagingService: MessagingService
  ) {}

  ngOnInit() {
    this.isTest = environment.TEST;

    this.showInstall = this.platform.is('mobileweb');

    this.pageTile = UiService.localGet(Constants.TITLE_CURRENT_PAGE);

    UiService.pageTitle.subscribe((title: string) => {
      this.pageTile = title;
    });
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
    this.menuSide.close(true);
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
