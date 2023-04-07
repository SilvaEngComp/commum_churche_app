/* eslint-disable @typescript-eslint/naming-convention */
import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { Feed } from 'src/app/models/feed';
import { FeedComment } from 'src/app/models/feedReaction';
import { User } from 'src/app/models/User';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  @Output() returnSubPage: EventEmitter<any> = new EventEmitter<any>();
  @Input() expandAll: boolean;
  @Input() feed: Feed;
  user: User;
  feeds: Feed[] = [];
  is_loading: boolean;
  showComments: boolean;
  feedReaction: FeedComment;
  is_menu_oppened: boolean;
  is_a_selected_post: boolean;
  permission: boolean;
  constructor() {}

  ngOnInit() {
    if (!this.feed) {
      if (UiService.localGet('selected-feed')) {
        this.feed = UiService.localGet('selected-feed');
      }
    }

    if (UiService.localGet('feed-page') === 'selected-feed') {
      this.is_a_selected_post = true;
    }
  }

  setComment() {
    UiService.localSet('selected-feed', this.feed);
    this.returnSubPage.emit({ page: 'selected-feed', feed: this.feed });
  }
  back() {
    UiService.feedPage.emit({ page: 'public' });
  }

  showCompleteMessage() {
    this.expandAll = !this.expandAll;
  }
}
