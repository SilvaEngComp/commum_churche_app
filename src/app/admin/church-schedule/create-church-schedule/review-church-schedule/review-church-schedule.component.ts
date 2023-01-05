import { Component, Input, OnInit } from '@angular/core';
import { Constants } from 'src/app/models/constants';
import { Feed } from 'src/app/models/feed';
import { User } from 'src/app/models/User';
import { LoginService } from 'src/app/services/login.service';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-review-church-schedule',
  templateUrl: './review-church-schedule.component.html',
  styleUrls: ['./review-church-schedule.component.scss'],
})
export class ReviewChurchScheduleComponent implements OnInit {
  @Input() expandAll: boolean;

  feed: Feed;

  constructor() {}

  ngOnInit() {
    this.checkFeed();
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
}
