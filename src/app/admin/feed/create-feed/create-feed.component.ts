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

@Component({
  selector: 'app-create-feed',
  templateUrl: './create-feed.component.html',
  styleUrls: ['./create-feed.component.scss'],
})
export class CreateFeedComponent implements OnInit {
  @Output() returnPage: EventEmitter<any> = new EventEmitter<any>();

  @Input() feed: Feed;
  publisher: User;
  is_loading: boolean;
  base_url: string = environment.IMAGE_URL;
  image: FormData;
  minDate: string;
  maxDate: string;
  datePipe = new DatePipe('en');
  dateValue: string;
  constructor(
    private feedService: FeedService,
    private messagingService: MessagingService,
    private exceptionService: ExceptionService
  ) {}

  ngOnInit() {
    this.image = new FormData();
    if (!this.feed) {
      if (localStorage.getItem(environment.LOCALSTORAGE + 'newFeed')) {
        this.feed = JSON.parse(
          localStorage.getItem(environment.LOCALSTORAGE + 'newFeed')
        );
      } else {
        this.feed = new Feed();
      }
    }

    if (!this.feed.date) {
      this.feed.date = this.datePipe.transform(Date.now(), 'dd/MM/yyyy');
    } else {
    }

    if (!this.feed.publisher) {
      this.feed.publisher = LoginService.getUser();
      this.save();
    }
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
    this.returnPage.emit({ page: 'public' });

    localStorage.removeItem(environment.LOCALSTORAGE + 'newFeed');
  }

  async addImage() {
    this.save();
    this.returnPage.emit({
      page: 'load-image',
      callbackPage: 'create',
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

  publish(back: boolean = false) {
    if (!this.feed.id) {
      this.feed.published = false;
    } else {
      this.feed.published = true;
    }
    this.feedService.store(this.feed).then((responser) => {
      this.feed = responser.data;
      if (back) {
        const push: PushNotify = new PushNotify(
          this.feed.title,
          this.feed.message
        );
        this.messagingService.send(push);
        this.back();
      }
    });
  }

  onlineClass(toggle: IonToggle) {
    this.feedService.onlineClass(this.feed, !toggle.checked).then((feed) => {
      this.feed = feed;
      this.save();
    });
  }
  save() {
    localStorage.setItem(
      environment.LOCALSTORAGE + 'newFeed',
      JSON.stringify(this.feed)
    );
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
