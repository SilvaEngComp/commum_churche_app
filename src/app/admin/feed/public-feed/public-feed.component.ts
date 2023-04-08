import { Constants } from 'src/app/models/constants';
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FeedService } from 'src/app/services/feed.service';
import { DatePipe } from '@angular/common';
import { ExceptionService } from 'src/app/services/exception-service.service';
import { LoginService } from 'src/app/services/login.service';
import { Feed } from 'src/app/models/feed';
import { FeedComment } from 'src/app/models/feedReaction';
import { User } from 'src/app/models/User';
import { FilterFeed } from 'src/app/models/filterFeed';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-public-feed',
  templateUrl: './public-feed.component.html',
  styleUrls: ['./public-feed.component.scss'],
})
export class PublicFeedComponent implements OnInit {
  @Output() returnPage: EventEmitter<any> = new EventEmitter<any>();
  @Input() editable: boolean;
  user: User;
  feeds: Feed[];
  is_loading: boolean;
  showComment: boolean;
  feedReaction: FeedComment;
  filterFeed: FilterFeed;
  localPageTitle: string;

  constructor(
    private feedService: FeedService,
    private exeptionService: ExceptionService
  ) {}

  ngOnInit() {
    this.localPageTitle = Constants.TITLE_FEED_NEWS_FEED;
    this.user = LoginService.getUser();
    this.feedReaction = new FeedComment();
    this.filterFeed = new FilterFeed();
    this.checkPermission();
    this.load();
  }

  checkPermission() {
    this.editable = UiService.validPermissions(Constants.ROLE_MULTIMIDIA);
  }

  back() {
    this.returnPage.emit({ page: Constants.MENU_GENERAL_OPTION_FEED });
  }

  load() {
    this.is_loading = true;
    this.exeptionService.loadingFunction();
    this.feedService
      .get(this.filterFeed)
      .then((responser) => {
        this.feeds = responser.data;
        const datePipe = new DatePipe('en');
        const now = datePipe.transform(Date.now(), 'yyyy-MM-dd');
        const time = datePipe.transform(Date.now(), 'HH:mm:ss');
        if (this.feeds) {
          this.feeds.filter((feed) => {
            feed.publisher = this.checkImage(feed?.publisher);
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
      })
      .finally(() => (this.is_loading = false));
  }

  checkImage(user: User) {
    if (!user?.image) {
      if (user?.gender.toLocaleLowerCase().includes('masculino')) {
        user.image = Constants.MALE_PERSON;
      } else {
        user.image = Constants.FEMALE_PERSON;
      }
    }
    return user;
  }
  newFeed() {
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
