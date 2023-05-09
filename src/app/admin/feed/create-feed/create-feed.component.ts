import { filter } from 'rxjs/operators';
import { ConstantMessages } from 'src/app/models/messages';
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DatePipe } from '@angular/common';
import { LoginService } from 'src/app/services/login.service';
import { FeedService } from 'src/app/services/feed.service';
import { MessagingService } from 'src/app/services/messaging.service';
import { UiService } from 'src/app/services/ui.service';
import { ExceptionService } from 'src/app/services/exception-service.service';
import { Feed } from 'src/app/models/feed';
import { User } from 'src/app/models/User';
import { PushNotify } from 'src/app/models/pushNotification';
import { Constants } from 'src/app/models/constants';
import { ModelFileUplod } from 'src/app/models/modelFileUpload';

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
  image: FormData;
  minDate: string;
  maxDate: string;
  datePipe = new DatePipe('en');
  dateValue: string;
  hasTime: boolean;
  session: string;
  localPageTitle: string;
  formData: FormData;
  localImages: ModelFileUplod;
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

    if (!this.feed.publisher) {
      this.feed.publisher = LoginService.getUser();
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
    if (aux > 3) {
      this.publish();
    } else {
      this.checkFeed();
      this.session = String(aux);
    }
  }
  back() {
    UiService.localRemove(Constants.FEED_ATTRIBUTES_FEED_OBJECT);
    UiService.localRemove(Constants.FEED_ATTRIBUTES_FEED_SESSION);
    this.returnSubpage.emit({ subpage: Constants.MENU_GENERAL_OPTION_FEED });
  }
  save() {
    UiService.localSet(Constants.FEED_ATTRIBUTES_FEED_OBJECT, this.feed);
    UiService.localSet(Constants.FEED_ATTRIBUTES_FEED_SESSION, this.session);
  }

  receiveSubpage(obj: any) {
    if (obj.files) {
      this.localImages = obj.files;
      this.feed.image = this.localImages?.files[0]?.path;
      this.save();
    }
  }

  publish() {
    console.log(this.feed);
    if (this.validForm()) {
      this.is_loading = true;
      this.feedService
        .store2(this.formData)
        .then(async (responser) => {
          this.feed = responser.data;
          await this.exceptionService.alertDialog(
            'Parabéns!Você Acabou de realizar uma publicação!',
            'Publicação enviada!'
          );

          this.back();
        })
        .catch((error) => {
          this.backSession();
          this.exceptionService.error(error);
        })
        .finally(() => (this.is_loading = false));
    }
  }

  validForm() {
    if (!this.formData) {
      this.formData = new FormData();
    }

    if (!this.feed?.title) {
      this.exceptionService.alertDialog(ConstantMessages.TITILE_INVALID);
      return;
    }
    this.formData.append('title', this?.feed?.title);

    if (!this.feed?.message) {
      this.exceptionService.alertDialog(ConstantMessages.LEGEND_INVALID);
      return;
    }
    this.formData.append('message', this?.feed?.message);
    if (!this.feed?.publisher?.id) {
      this.exceptionService.alertDialog(ConstantMessages.LEGEND_INVALID);
      return;
    }
    this.formData.append('publisher_id', String(this?.feed?.publisher?.id));
    if (!this.feed?.date) {
      this.exceptionService.alertDialog(ConstantMessages.DATE_INVALID);
      return;
    }

    this.formData.append('date', String(this?.feed?.date));

    if (this.localImages?.files?.length > 0) {
      this.formData.append(
        'file',
        this.localImages?.files[0]?.file,
        this.localImages?.files[0]?.name
      );
    }
    return true;
  }
}
