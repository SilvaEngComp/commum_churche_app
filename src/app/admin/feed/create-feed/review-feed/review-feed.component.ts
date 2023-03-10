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
  constructor(private exceptionService: ExceptionService) {}

  ngOnInit() {
    this.datePipe = new DatePipe('en');
    this.checkFeed();
    this.feed.date = this.datePipe.transform(Date.now(), 'yyyy-MM-dd');
  }
  checkFeed() {
    this.feed = UiService.localGet(Constants.FEED_ATTRIBUTES_FEED_OBJECT);
    if (!this.feed) {
      this.feed = new Feed();
    }

    if (!this.feed.publisher) {
      const user = LoginService.getUser();
      this.feed.publisher = new User();
      this.feed.publisher.id = user.id;
      this.feed.publisher.roles = user.roles;
    }
  }
  showCompleteMessage() {
    this.expandAll = !this.expandAll;
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
      } else {
        this.exceptionService.alertDialog(validDateObj.message);
      }
    }
  }
  setDateAsNow() {
    this.feed.date = this.datePipe.transform(Date.now(), 'dd/MM/yyyy');
  }
  setTimeAsNow() {
    this.feed.time = this.datePipe.transform(Date.now(), 'HH::mm');
  }

  onSetDate(value: any, option: number = 0) {
    if (value) {
      this.feed.date = value.substring(0, 10);
    } else {
      if (option === 1) {
        this.feed.date = this.datePipe.transform(Date.now(), 'yyyy-MM-dd');
      } else {
        const yesterday = new Date(
          new Date().setDate(new Date().getDate() - 1)
        );
        this.feed.date = this.datePipe.transform(yesterday, 'yyyy-MM-dd');
      }
    }
  }
}
