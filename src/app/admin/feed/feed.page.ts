/* eslint-disable @typescript-eslint/member-ordering */
import { Component, OnInit } from '@angular/core';
import { Feed } from 'src/app/models/feed';
import { FeedService } from 'src/app/services/feed.service';
import { UiService } from 'src/app/services/ui.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.page.html',
  styleUrls: ['./feed.page.scss'],
})
export class FeedPage implements OnInit {
  constructor(private feedService: FeedService) {}

  feed: Feed;
  callbackPage: string;
  ngOnInit() {
    this.page = 'public';

    if (UiService.localGet('feed-page')) {
      this.page = UiService.localGet('feed-page');
    }

    UiService.feedPage.subscribe((obj) => {
      if (obj.page) {
        this.saveFeedPage(obj.page);
      }
    });
  }

  page: string;

  returnPage(obj) {
    if (obj.feed) {
      this.feed = obj.feed;
      this.saveFeed();
    }
    if (obj.files) {
      this.feedService
        .upload(obj.files.formData, this.feed)
        .then((responser) => {
          this.feed.image = responser.data.image;
          this.saveFeed();
          window.location.reload();
        });
    }
    if (obj.callbackPage) {
      this.callbackPage = obj.callbackPage;
      UiService.localSet('callbackPage', this.callbackPage);
    }
    if (obj.page) {
      this.saveFeedPage(obj.page);
    }
  }
  doRefresh() {
    window.location.reload();
  }

  saveFeedPage(page) {
    this.page = page;
    UiService.localSet('feed-page', this.page);
  }

  saveFeed() {
    UiService.localSet('newFeed', JSON.stringify(this.feed));
  }
}
