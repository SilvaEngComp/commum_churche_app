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
import { Constants } from 'src/app/models/constants';

@Component({
  selector: 'app-publication',
  templateUrl: './publication.component.html',
  styleUrls: ['./publication.component.scss'],
})
export class PublicationComponent implements OnInit {
  @Output() returnSubpage: EventEmitter<any> = new EventEmitter<any>();
  @Input() expandAll: boolean;
  @Input() feed: Feed;
  @Input() showReactions: boolean;
  @Input() editable: boolean;
  user: User;
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
    private feedReactionService: FeedCommentService
  ) {}

  ngOnInit() {
    if (!this.feed) {
      this.feed = UiService.localGet(Constants.FEED_ATTRIBUTES_FEED_OBJECT);
    }
    console.log(this.feed);

    if (UiService.localGet(Constants.FEED_SUBPAGE) === 'selected-feed') {
      this.is_a_selected_post = true;
    }

    this.feedReaction = new FeedComment();
  }
  goToWhatsapp() {
    UiService.socialNetworks('w');
  }
  setLove() {
    this.feed.love = !this.feed.love;
    this.feedReactionService.setLove(this.feed).catch((error) => {
      this.exeptionService.error(error);
    });
  }
  accessUrl() {
    window.open(this?.feed?.url);
  }
  back() {
    UiService.feedPage.emit({ subpage: Constants.FEED_PAGE_PUBLIC });
  }

  showCompleteMessage() {
    this.expandAll = !this.expandAll;
  }

  delete(feed: Feed) {
    this.exeptionService.loadingFunction();
    this.feedService
      .destroy(feed)
      .then((responser) => {
        this.returnSubpage.emit({ feeds: responser.data });
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
        console.log(data);
        if (data === 'edit') {
          console.log(data);

          this.returnSubpage.emit({
            subpage: Constants.FEED_PAGE_CREATE_FEED,
            feed,
          });
        } else {
          this.delete(feed);
        }
      }
      this.is_menu_oppened = false;
    }
  }
}
