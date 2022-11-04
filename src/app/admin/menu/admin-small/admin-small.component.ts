import { ExceptionService } from 'src/app/services/exception-service.service';
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/member-ordering */
import {
  AfterViewInit,
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { IonTabs, Platform } from '@ionic/angular';
import { FcmService } from 'src/app/services/fcm.service';
import { MessagingService } from 'src/app/services/messaging.service';
import { UiService } from 'src/app/services/ui.service';
import { FeedService } from 'src/app/services/feed.service';
import { PushNotify } from 'src/app/models/pushNotification';
@Component({
  selector: 'app-admin-small',
  templateUrl: './admin-small.component.html',
  styleUrls: ['./admin-small.component.scss'],
})
export class AdminSmallComponent implements OnInit, AfterViewInit {
  @Output() selectedPage: EventEmitter<any> = new EventEmitter<any>();
  page_selected: string;
  badge_feed: number;

  constructor(
    // private fcmService: FcmService,
    private platform: Platform,
    private feedService: FeedService,
    private exceptionService: ExceptionService,
    private messagingService: MessagingService
  ) {}

  @ViewChild('tabAdmin', { static: false }) tab!: IonTabs;

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

  async hasSaw() {
    this.page_selected = await this.tab.getSelected();
    if (this.page_selected === 'feed' && this.badge_feed > 0) {
      await this.feedService.hasSawNewest();
      this.badge_feed = null;
    }
    UiService.localSet('tab-page', this.page_selected);
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
