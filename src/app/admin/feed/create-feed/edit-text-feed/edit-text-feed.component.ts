/* eslint-disable @typescript-eslint/naming-convention */
import { DatePipe } from '@angular/common';
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
  is_loading: boolean;
  base_url: string = environment.IMAGE_URL;
  image: FormData;

  session: number;
  constructor(private exceptionService: ExceptionService) {}

  ngOnInit() {
    this.session = 1;
    this.image = new FormData();
    this.feed = UiService.localGet(Constants.FEED_ATTRIBUTES_FEED_OBJECT);
    if (!this.feed) {
      this.feed = new Feed();
    }
    if (!this.feed?.hasTime) {
      this.feed.hasTime = false;
    }
    console.log(this.feed);
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
