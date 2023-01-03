import { Constants } from 'src/app/models/constants';
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { environment } from 'src/environments/environment';
import { FeedService } from 'src/app/services/feed.service';
import { DatePipe } from '@angular/common';
import { ExceptionService } from 'src/app/services/exception-service.service';
import { LoginService } from 'src/app/services/login.service';
import { Feed } from 'src/app/models/feed';
import { FeedComment } from 'src/app/models/feedReaction';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-public-feed',
  templateUrl: './public-feed.component.html',
  styleUrls: ['./public-feed.component.scss'],
})
export class PublicFeedComponent implements OnInit {
  @Output() returnPage: EventEmitter<any> = new EventEmitter<any>();

  user: User;
  feeds: Feed[];
  base_url: string = environment.IMAGE_URL;
  is_loading: boolean;
  showComment: boolean;
  feedReaction: FeedComment;

  constructor(
    private feedService: FeedService,
    private exeptionService: ExceptionService
  ) {}

  ngOnInit() {
    console.log('public feed');
    this.user = LoginService.getUser();
    this.feedReaction = new FeedComment();
    this.load();
  }

  async load() {
    this.is_loading = true;
    this.exeptionService.loadingFunction();
    this.feeds = await this.feedService.get();
    console.log(this.feeds);
    const datePipe = new DatePipe('en');
    const now = datePipe.transform(Date.now(), 'yyyy-MM-dd');
    const time = datePipe.transform(Date.now(), 'HH:mm:ss');
    if (this.feeds) {
      this.feeds.filter((feed) => {
        if (feed.date) {
          if (feed.date < now) {
            feed.checkPublish = true;
          } else {
            if (feed.time <= time) {
              feed.checkPublish = true;
            }
          }
        } else {
          if (feed.publisher.id === this.user.id) {
            feed.checkPublish = true;
          } else {
            feed.checkPublish = false;
          }
        }
      });
    }
    this.is_loading = false;
  }

  newFeed() {
    console.log(Constants.FEED_PAGE_CREATE_FEED);
    this.returnPage.emit({
      subpage: Constants.FEED_PAGE_CREATE_FEED,
      feed: new Feed(),
    });
  }

  returnSubPage(obj: any) {
    if (obj.subpage) {
      this.returnPage.emit(obj);
    }
    if (obj.feeds) {
      this.feeds = obj.feeds;
    }
  }
}
