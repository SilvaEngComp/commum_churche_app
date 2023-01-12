/* eslint-disable @typescript-eslint/naming-convention */
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { UiService } from 'src/app/services/ui.service';
import { MenuPostComponent } from '../menu-post/menu-post.component';
import { FeedCommentService } from 'src/app/services/feed-reaction.service';
import { ExceptionService } from 'src/app/services/exception-service.service';
import { environment } from 'src/environments/environment';
import { Feed } from 'src/app/models/feed';
import { FeedComment } from 'src/app/models/feedReaction';
import { User } from 'src/app/models/User';
import { Constants } from 'src/app/models/constants';

@Component({
  selector: 'app-feed-comment',
  templateUrl: './feed-comment.component.html',
  styleUrls: ['./feed-comment.component.scss'],
})
export class FeedCommentComponent implements OnInit {
  @ViewChild('texAreaMessage', { read: ElementRef }) message: ElementRef;
  @Output() returnSubpage: EventEmitter<any> = new EventEmitter<any>();
  @Input() expandAll: boolean;
  @Input() feed: Feed;
  feedReactions: FeedComment[] = [];
  is_loading: boolean;
  permission: boolean;
  newComment: FeedComment;
  commenter: User;
  base_url: string = environment.IMAGE_URL;
  is_editting: boolean;
  constructor(
    private popCtrl: PopoverController,
    private exeptionService: ExceptionService,
    private feedReactionService: FeedCommentService
  ) {}

  back() {
    this.returnSubpage.emit({ subpage: Constants.FEED_PAGE_PUBLIC });

    UiService.localRemove(Constants.FEED_ATTRIBUTES_FEED_OBJECT);
  }

  ngOnInit() {
    this.newComment = new FeedComment();
    this.feed = UiService.localGet(Constants.FEED_ATTRIBUTES_FEED_OBJECT);
  }

  showCompleteMessage() {
    this.expandAll = !this.expandAll;
  }
  setLove() {
    this.feed.love = !this.feed.love;
    this.feedReactionService.setLove(this.feed).catch((error) => {
      this.exeptionService.error(error);
    });
  }
  editCancel(feedReaction: FeedComment) {
    feedReaction.edit = false;
  }
  edit(feedReaction: FeedComment) {
    this.feedReactionService
      .update(feedReaction)
      .then((responser) => {
        this.feedReactions = responser.data;
        this.feedReactions.filter((reaction) => {
          if (reaction.id === feedReaction.id) {
            reaction.edit = false;
          }
        });
      })
      .catch((error) => {
        this.exeptionService.error(error);
      });
  }

  manageFeed(data) {
    this.returnSubpage.emit(data);
  }

  delete(feedReaction: FeedComment) {
    this.exeptionService.loadingFunction();
    this.feedReactionService.destroy(feedReaction).then((responser) => {
      this.feed.comments = responser.data;
    });
  }

  update() {
    this.feedReactionService
      .update(this.newComment)
      .then((responser) => {
        this.is_editting = false;
        this.exeptionService.success(responser);
      })
      .catch((err) => this.exeptionService.error(err));
  }
  async menuPost(comment: FeedComment, ev: any) {
    const pop = await this.popCtrl.create({
      component: MenuPostComponent,
      event: ev,
    });

    await pop.present();

    const { data } = await pop.onDidDismiss();

    if (data) {
      console.log(data);
      if (data === 'edit') {
        this.is_editting = true;
        this.newComment = comment;
      } else {
        this.delete(comment);
      }
    }
  }

  postComment() {
    if (this.newComment.message.length > 0) {
      this.is_loading = true;
      this.feedReactionService
        .store(this.newComment, this.feed)
        .then((responser) => {
          console.log(responser);
          this.feed.comments = responser.data;
          console.log(this.feed.comments);
          this.newComment = new FeedComment();
          this.exeptionService.success(responser.data);
        })
        .catch((error) => {
          this.exeptionService.error(error);
        })
        .finally(() => {
          this.is_editting = false;
          this.is_loading = false;
        });
    }
  }
}
