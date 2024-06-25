import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { Share } from '@capacitor/share';
import { IonMenu, IonTabs, PopoverController } from '@ionic/angular';
import { User } from 'src/app/models/User';
import { Constants } from 'src/app/models/constants';
import { PushNotify } from 'src/app/models/pushNotification';
import { Verse } from 'src/app/models/verse';
import { ExceptionService } from 'src/app/services/exception-service.service';
import { FeedService } from 'src/app/services/feed.service';
import { MessagingService } from 'src/app/services/messaging.service';
import { UiService } from 'src/app/services/ui.service';
import { environment } from 'src/environments/environment';
import { TutorialComponent } from '../../tutorial/tutorial.component';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-side-menu-admin',
  templateUrl: './side-menu-admin.component.html',
  styleUrls: ['./side-menu-admin.component.scss'],
})
export class SideMenuAdminComponent implements OnInit {
  @ViewChild('menuSide', { static: false }) menuSide!: IonMenu;
  @Output() selectedPage: EventEmitter<any> = new EventEmitter<any>();
  verse: Verse;
  pageSelected: string;
  badgeFeed: number;
  isMember: boolean;
  user: User;
  isTest: boolean;
  showColorMark: boolean;
  renderer: Renderer2;
  pageTile: string;

  constructor(
    private feedService: FeedService,
    private exceptionService: ExceptionService,
    private messagingService: MessagingService,
    private popCtrl: PopoverController
  ) {}

  ngOnInit() {
    this.checkNewFeed();
    this.isTest = environment.TEST;
    this.user = LoginService.getUser();
    UiService.showColorMarkEmitter.subscribe((data) => {
      this.verse = data.verse;
      this.setShowColorMark(data.status);
    });

    UiService.returnColorMaker.subscribe(() => {
      this.setShowColorMark(false);
    });

    this.pageTile = UiService.localGet(Constants.TITLE_CURRENT_PAGE);
  }

  async showTutorial(event: any) {
    const pop = await this.popCtrl.create({
      component: TutorialComponent,
      event,
      componentProps: { event },
    });

    pop.present();
  }

  standby() {
    let localImage;
    if (this.user?.gender?.toLocaleLowerCase().includes('masculino')) {
      localImage = Constants.MALE_PERSON;
    } else {
      localImage = Constants.FEMALE_PERSON;
    }

    document.getElementById('userImage').setAttribute('src', localImage);
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

  setShowColorMark(showcolorMark: boolean) {
    this.showColorMark = showcolorMark;
    UiService.localSet(Constants.IS_COLOR_MANAGER_OPPENED, this.showColorMark);
  }
  async setPage(page: number) {
    UiService.localRemove(Constants.USER_MAINTAINCE);
    this.selectedPage.emit(page);
    this.setShowColorMark(false);
    if (page === 7) {
      this.updateLastAccess();
    }
    console.log(this.menuSide);
    await this.menuSide.close(true);
  }

  async updateLastAccess() {
    if (this.badgeFeed > 0) {
      this.badgeFeed = null;
      this.feedService
        .updateLastAccess()
        .catch((error) => this.exceptionService.error(error));
    }
    UiService.localSet('tab-page', this.pageSelected);
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

  checkNewFeed() {
    this.feedService
      .checkNewest()
      .then((responser) => {
        this.badgeFeed = responser.data;
      })
      .catch((error) => this.exceptionService.error(error));
  }
}
