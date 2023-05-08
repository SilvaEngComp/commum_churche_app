/* eslint-disable @typescript-eslint/naming-convention */
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Constants } from 'src/app/models/constants';
import { Feed } from 'src/app/models/feed';
import { User } from 'src/app/models/User';
import { ExceptionService } from 'src/app/services/exception-service.service';
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
  session: number;
  constructor() {}

  ngOnInit() {
    this.session = 1;
    this.checkFeed();
  }

  checkFeed() {
    this.feed = UiService.localGet(Constants.FEED_ATTRIBUTES_FEED_OBJECT);
    if (!this.feed) {
      this.feed = new Feed();
    }
  }

  save() {
    UiService.localSet(Constants.FEED_ATTRIBUTES_FEED_OBJECT, this.feed);
  }

  onTypeTitle(ev) {
    this.feed.title = ev.target.value;
    this.save();
  }

  onTypeUrl(ev) {
    this.feed.url = ev.target.value;
    this.save();
  }

  onTypeMessage(ev) {
    this.feed.message = ev.target.value;
    this.save();
  }
}
