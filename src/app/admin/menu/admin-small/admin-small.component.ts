import { element } from 'protractor';
import { environment } from 'src/environments/environment';
import { User } from 'src/app/models/user';
import { ExceptionService } from 'src/app/services/exception-service.service';
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/member-ordering */
import {
  AfterViewInit,
  Component,
  ElementRef,
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
import { LoginService } from 'src/app/services/login.service';
import { Constants } from 'src/app/models/constants';
@Component({
  selector: 'app-admin-small',
  templateUrl: './admin-small.component.html',
  styleUrls: ['./admin-small.component.scss'],
})
export class AdminSmallComponent implements OnInit {
  @Output() selectedPage: EventEmitter<any> = new EventEmitter<any>();
  element: ElementRef;
  page_selected: string;
  badge_feed: number;
  isMember: boolean;
  user: User;
  isTest: boolean;
  showColorMark: boolean;
  constructor(
    // private fcmService: FcmService,
    private platform: Platform,
    private feedService: FeedService,
    private exceptionService: ExceptionService,
    private messagingService: MessagingService
  ) {}

  @ViewChild('tabAdmin', { static: false }) tab!: IonTabs;

  ngOnInit() {
    this.isTest = environment.TEST;
    UiService.showColorMarkEmitter.subscribe((data) => {
      this.element = data.element;
      console.log(data);
      this.setShowColorMark(data.status);
    });

    UiService.returnColorMaker.subscribe((data) => {
      this.setShowColorMark(false);
    });
  }

  setShowColorMark(showcolorMark: boolean) {
    this.showColorMark = showcolorMark;
    UiService.localSet(Constants.IS_COLOR_MANAGER_OPPENED, this.showColorMark);
  }
  async setPage(page: number) {
    UiService.localRemove(Constants.USER_MAINTAINCE);
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

  load() {
    this.feedService
      .checkNewest()
      .then((responser) => (this.badge_feed = responser.data));
  }
}
