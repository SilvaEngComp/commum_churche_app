/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/naming-convention */
import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  Output,
  EventEmitter,
} from '@angular/core';
import { Platform, IonTabs } from '@ionic/angular';
import { PushNotify } from 'src/app/models/pushNotification';
import { ExceptionService } from 'src/app/services/exception-service.service';
import { FeedService } from 'src/app/services/feed.service';
import { MessagingService } from 'src/app/services/messaging.service';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-menu-home-small',
  templateUrl: './menu-home-small.component.html',
  styleUrls: ['./menu-home-small.component.scss'],
})
export class MenuHomeSmallComponent implements OnInit, AfterViewInit {
  @Output() selectedPage: EventEmitter<any> = new EventEmitter<any>();
  page_selected: string;
  badge_feed: number;
  @ViewChild('tabHome', { static: false }) tab!: IonTabs;

  constructor(
    // private fcmService: FcmService,
    private platform: Platform,
    private feedService: FeedService,
    private exceptionService: ExceptionService,
    private messagingService: MessagingService
  ) {}

  ngOnInit() {}
  ngAfterViewInit() {
    // this.load();
    // if (!this.platform.is('cordova')) {
    //   this.requestPermission();
    // } else {
    //   this.fcmService.initPush();
    // }
    // if (UiService.localGet('tab-page')) {
    //   this.page_selected = UiService.localGet('tab-page');
    // } else {
    //   this.page_selected = 'challenge';
    // }
    // this.tab.select(this.page_selected);
  }

  async setPage(page: number) {
    this.selectedPage.emit(page);
    // UiService.localSet('tab-page', this.page_selected);
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

  async load() {
    this.badge_feed = await this.feedService.checkNewest();
  }
}
