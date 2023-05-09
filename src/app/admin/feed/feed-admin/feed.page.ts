/* eslint-disable @typescript-eslint/member-ordering */
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Constants } from 'src/app/models/constants';
import { Feed } from 'src/app/models/feed';
import { FeedService } from 'src/app/services/feed.service';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-feed-admin',
  templateUrl: './feed.page.html',
  styleUrls: ['./feed.page.scss'],
})
export class FeedAdminPage implements OnInit {
  @Output() sessionPage: EventEmitter<string> = new EventEmitter<string>();
  @Input() subpage: string;
  @Input() editable: boolean;
  feed: Feed;
  callbackPage: string;
  constructor(private feedService: FeedService) {}

  ngOnInit() {
    UiService.localSet(
      Constants.TITLE_CURRENT_PAGE,
      Constants.TITLE_FEED_REGISTER
    );
    UiService.pageTitle.emit(Constants.TITLE_FEED_REGISTER);
    if (!this.subpage) {
      this.subpage = UiService.localGet(Constants.FEED_SUBPAGE);
    }
    if (!this.subpage) {
      UiService.localSet(Constants.FEED_SUBPAGE, Constants.FEED_PAGE_PUBLIC);
      if (!this.subpage) {
        this.subpage = Constants.FEED_PAGE_HOME;
      }
    }
    UiService.feedPage.subscribe((obj) => {
      if (obj.subpage) {
        this.saveFeedPage(obj.subpage);
      }
    });

    console.log(this.subpage);
  }

  receive(obj) {
    if (obj?.page === '-1') {
      this.sessionPage.emit(Constants.MENU_GENERAL_OPTION_MORE);
    }
    if (obj?.feed) {
      this.feed = obj.feed;
      this.saveFeed();
    }
    if (obj?.files) {
      this.feedService
        .upload(obj.files.formData, this.feed)
        .then((responser) => {
          this.feed.image = responser.data.image;
          this.saveFeed();
          // window.location.reload();
        });
    }
    if (obj?.callbackPage) {
      this.callbackPage = obj.callbackPage;
      UiService.localSet('callbackPage', this.callbackPage);
    }
    if (obj?.subpage) {
      this.saveFeedPage(obj.subpage);
    }
  }
  doRefresh() {
    // window.location.reload();
  }

  saveFeedPage(page) {
    this.subpage = page;
    UiService.localSet(Constants.FEED_SUBPAGE, this.subpage);
  }

  saveFeed() {
    UiService.localSet(Constants.FEED_ATTRIBUTES_FEED_OBJECT, this.feed);
  }
}
