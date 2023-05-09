import { ConstantMessages } from './../../../../models/messages';
import { ExceptionService } from './../../../../services/exception-service.service';
import { Component, Input, OnInit } from '@angular/core';
import { Constants } from 'src/app/models/constants';
import { Feed } from 'src/app/models/feed';
import { User } from 'src/app/models/User';
import { LoginService } from 'src/app/services/login.service';
import { UiService } from 'src/app/services/ui.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-review-feed',
  templateUrl: './review-feed.component.html',
  styleUrls: ['./review-feed.component.scss'],
})
export class ReviewFeedComponent implements OnInit {
  @Input() expandAll: boolean;

  feed: Feed;
  minDate: string;
  maxDate: string;
  datePipe = new DatePipe('en');
  dateValue: string;
  hasTime: boolean;
  today: string;
  constructor(private exceptionService: ExceptionService) {}

  ngOnInit() {
    this.datePipe = new DatePipe('en');
    this.checkFeed();
    this.today = this.datePipe.transform(Date.now(), 'yyyy-MM-dd HH:mm');
    if (!this?.feed?.date) {
      this.setDateAsNow();
    }
  }
  checkFeed() {
    this.feed = UiService.localGet(Constants.FEED_ATTRIBUTES_FEED_OBJECT);
    if (!this.feed) {
      this.feed = new Feed();
    }
  }
  showCompleteMessage() {
    this.expandAll = !this.expandAll;
  }

  setDate(date) {
    const validDateObj = UiService.validDate(date, null, false);
    if (validDateObj) {
      if (validDateObj.status) {
        this.feed.date = validDateObj.date;
      } else {
        this.exceptionService.alertDialog(validDateObj.message);
      }
    }
  }
  save() {
    UiService.localSet(Constants.FEED_ATTRIBUTES_FEED_OBJECT, this.feed);
  }

  setDateAsNow() {
    this.feed.date = this.datePipe.transform(Date.now(), 'yyyy-MM-dd HH:mm');
  }

  onSetDate(value: any) {
    if (value) {
      this.feed.date = this.datePipe.transform(value, 'yyyy-MM-dd HH:mm');
      this.save();
    }
  }
}
