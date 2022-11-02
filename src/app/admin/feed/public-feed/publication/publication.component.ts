import { Platform } from '@ionic/angular';
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { ExceptionService } from 'src/app/services/exception-service.service';
import { FeedCommentService } from 'src/app/services/feed-reaction.service';
import { FeedService } from 'src/app/services/feed.service';
import { UiService } from 'src/app/services/ui.service';
import { environment } from 'src/environments/environment';
import { MenuPostComponent } from '../menu-post/menu-post.component';
import { LoginService } from 'src/app/services/login.service';
import { Feed } from 'src/app/models/feed';
import { FeedComment } from 'src/app/models/feedReaction';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-publication',
  templateUrl: './publication.component.html',
  styleUrls: ['./publication.component.scss'],
})
export class PublicationComponent implements OnInit {
  @Output() returnSubPage: EventEmitter<any> = new EventEmitter<any>();
  @Input() expandAll: boolean;
  @Input() feed: Feed;
  user: User;
  feeds: Feed[] = [];
  base_url: string = environment.IMAGE_URL;
  is_loading: boolean;
  showComments: boolean;
  feedReaction: FeedComment;
  is_menu_oppened: boolean;
  is_a_selected_post: boolean;
  permission: boolean;
  constructor(
    private feedService: FeedService,
    private popCtrl: PopoverController,
    private exeptionService: ExceptionService,
    private feedReactionService: FeedCommentService,
    private platform: Platform
  ) {}

  ngOnInit() {
    if (!this.feed) {
      if (UiService.localGet('selected-feed')) {
        this.feed = UiService.localGet('selected-feed');
      }
    }

    if (UiService.localGet('feed-page') === 'selected-feed') {
      this.is_a_selected_post = true;
    }
    this.user = LoginService.getUser();

    this.feedReaction = new FeedComment();

    if (this.feed.publisher.id === this.user.id) {
      this.permission = true;
    } else {
      this.permission = false;
    }
  }

  setLove() {
    this.feed.love = !this.feed.love;
    this.feedReactionService.setLove(this.feed).catch((error) => {
      this.exeptionService.error(error);
    });
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

  delete(feed: Feed) {
    this.exeptionService.loadingFunction();
    this.feedService
      .destroy(feed)
      .then((responser) => {
        this.feeds = responser.data;
        this.returnSubPage.emit({ feeds: responser.data });

        this.exeptionService.success(responser);
      })
      .catch((err) => this.exeptionService.error(err));
  }

  async menuPost(feed: Feed, ev) {
    if (!this.is_menu_oppened) {
      this.is_menu_oppened = true;

      const pop = await this.popCtrl.create({
        component: MenuPostComponent,
        event: ev,
      });

      await pop.present();
      const { data } = await pop.onDidDismiss();

      if (data) {
        if (data === 'edit') {
          this.returnSubPage.emit({ page: 'create', feed });
        } else {
          this.delete(feed);
        }
      }
      this.is_menu_oppened = false;
    }
  }
}
