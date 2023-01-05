/* eslint-disable @typescript-eslint/naming-convention */
import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IonToggle } from '@ionic/angular';
import { Constants } from 'src/app/models/constants';
import { Feed } from 'src/app/models/feed';
import { PushNotify } from 'src/app/models/pushNotification';
import { User } from 'src/app/models/User';
import { ExceptionService } from 'src/app/services/exception-service.service';
import { FeedService } from 'src/app/services/feed.service';
import { LoginService } from 'src/app/services/login.service';
import { MessagingService } from 'src/app/services/messaging.service';
import { UiService } from 'src/app/services/ui.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-edit-text-feed',
  templateUrl: './edit-text-feed.component.html',
  styleUrls: ['./edit-text-feed.component.scss'],
})
export class EditTextFeedComponent implements OnInit {
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
  session: number;
  constructor(
    private feedService: FeedService,
    private messagingService: MessagingService,
    private exceptionService: ExceptionService
  ) {}

  ngOnInit() {
    this.session = 1;
    this.image = new FormData();
    this.feed = UiService.localGet(Constants.FEED_ATTRIBUTES_FEED_OBJECT);
    if (!this.feed?.hasTime) {
      this.feed.hasTime = false;
    }
    console.log(this.feed);
  }

  setTimeExists() {
    this.hasTime = !this.hasTime;
    this.feed.hasTime = this.hasTime;
  }

  setDate(date) {
    const validDateObj = UiService.validDate(date);
    if (validDateObj) {
      if (validDateObj.status) {
        this.feed.date = validDateObj.date;
        this.save();
      } else {
        this.exceptionService.alertDialog(validDateObj.message);
      }
    }
  }
  setTime(time) {
    const validDateObj = UiService.validTime(time);
    if (validDateObj) {
      if (validDateObj.status) {
        this.feed.date = validDateObj.date;
        this.save();
      } else {
        this.exceptionService.alertDialog(validDateObj.message);
      }
    }
  }

  back() {
    this.returnSubpage.emit({ subpage: Constants.FEED_PAGE_PUBLIC });

    UiService.localRemove(Constants.FEED_ATTRIBUTES_FEED_OBJECT);
  }
  save() {
    UiService.localSet(Constants.FEED_ATTRIBUTES_FEED_OBJECT, this.feed);
  }

  async addImage() {
    this.save();
    this.returnSubpage.emit({
      subpage: 'load-image',
      callbackSubpage: 'create',
      feed: this.feed,
    });
  }

  setDateAsNow() {
    this.feed.date = this.datePipe.transform(Date.now(), 'dd/MM/yyyy');
    this.save();
  }
  setTimeAsNow() {
    this.feed.time = this.datePipe.transform(Date.now(), 'HH::mm');
    this.save();
  }

  onTypeTitle(title) {
    this.feed.title = title;
    this.save();
  }

  onTypeMessage(ev) {
    this.feed.message = ev.target.value;
    this.save();
  }
}
