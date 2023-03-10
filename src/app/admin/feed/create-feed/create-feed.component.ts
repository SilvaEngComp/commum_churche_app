import { ConstantMessages } from 'src/app/models/messages';
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IonToggle } from '@ionic/angular';
import { DatePipe } from '@angular/common';
import { LoginService } from 'src/app/services/login.service';
import { environment } from 'src/environments/environment';
import { FeedService } from 'src/app/services/feed.service';
import { MessagingService } from 'src/app/services/messaging.service';
import { UiService } from 'src/app/services/ui.service';
import { ExceptionService } from 'src/app/services/exception-service.service';
import { Feed } from 'src/app/models/feed';
import { User } from 'src/app/models/User';
import { PushNotify } from 'src/app/models/pushNotification';
import { Constants } from 'src/app/models/constants';

@Component({
  selector: 'app-create-feed',
  templateUrl: './create-feed.component.html',
  styleUrls: ['./create-feed.component.scss'],
})
export class CreateFeedComponent implements OnInit {
  @Output() returnSubpage: EventEmitter<any> = new EventEmitter<any>();

  @Input() feed: Feed;
  publisher: User;
  is_loading: boolean;
  base_url: string = environment.IMAGE_URL;
  image: FormData;
  minDate: string;
  maxDate: string;
  datePipe = new DatePipe('en');
  dateValue: string;
  hasTime: boolean;
  session: string;
  localPageTitle: string;
  constructor(
    private feedService: FeedService,
    private messagingService: MessagingService,
    private exceptionService: ExceptionService
  ) {}

  ngOnInit() {
    this.session = UiService.localGet(Constants.FEED_ATTRIBUTES_FEED_SESSION);
    if (!this.session) {
      this.session = '1';
    }
    this.image = new FormData();
    this.checkFeed();
    this.localPageTitle = !this.feed?.id
      ? 'NOVA PUBLICAÇÃO'
      : 'EDITAR PUBLICAÇÃO';
  }

  setSession(ev: any) {
    this.session = String(ev.target.value);
    this.checkFeed();
  }

  checkFeed() {
    this.feed = UiService.localGet(Constants.FEED_ATTRIBUTES_FEED_OBJECT);
    if (!this.feed) {
      this.feed = new Feed();
    }

    if (!this.feed.date) {
      this.feed.date = this.datePipe.transform(Date.now(), 'dd/MM/yyyy');
    } else {
    }

    if (!this.feed.publisher) {
      const user = LoginService.getUser();
      this.feed.publisher = new User();
      this.feed.publisher.id = user.id;
      this.feed.publisher.roles = user.roles;
    }

    if (this.session === '1') {
      this.feed.isAvailable = false;
    } else if (this.session === '3') {
      this.feed.isAvailable = true;
    }
    this.save();
  }

  backSession() {
    const aux = Number(this.session) - 1;
    this.session = String(aux);
    this.checkFeed();
  }
  nextSession() {
    const aux = Number(this.session) + 1;
    this.session = String(aux);
    this.save();
  }
  back() {
    console.log({ subpage: Constants.FEED_PAGE_PUBLIC });
    this.returnSubpage.emit({ subpage: Constants.FEED_PAGE_PUBLIC });

    UiService.localRemove(Constants.FEED_ATTRIBUTES_FEED_OBJECT);
  }
  save() {
    UiService.localSet(Constants.FEED_ATTRIBUTES_FEED_OBJECT, this.feed);
    UiService.localSet(Constants.FEED_ATTRIBUTES_FEED_SESSION, this.session);
  }

  receiveSubpage(obj: any) {
    if (obj.files) {
      this.feedService
        .upload(obj.files.formData, this.feed)
        .then((responser) => {
          this.feed.image = responser.data.image;
          this.save();
          // window.location.reload();
        });
    }
  }

  publish() {
    this.checkFeed();

    if (this.session !== '2') {
      if (this.validForm()) {
        this.feedService.store(this.feed).then((responser) => {
          this.feed = responser.data;
          this.save();
          if (this.session === '3') {
            this.back();
            const push: PushNotify = new PushNotify(
              this.feed.title,
              this.feed.message
            );
            this.messagingService.send(push);
          } else {
            this.nextSession();
          }
        });
      }
    } else {
      this.nextSession();
    }

    console.log(this.session);
  }

  validForm() {
    if (!this.feed?.title) {
      this.exceptionService.alertDialog(ConstantMessages.TITILE_INVALID);
      return;
    }

    return true;
  }
}
