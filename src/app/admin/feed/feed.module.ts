import { MenuPostComponent } from './public-feed/menu-post/menu-post.component';
import { PublicFeedComponent } from './public-feed/public-feed.component';
import { CreateFeedComponent } from './create-feed/create-feed.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FeedPageRoutingModule } from './feed-routing.module';

import { FeedPage } from './feed.page';
import { DatabaseService } from 'src/app/services/database.service';
import { LoginService } from 'src/app/services/login.service';
import { MessagingService } from 'src/app/services/messaging.service';
import { AngularFireMessagingModule } from '@angular/fire/compat/messaging';
import { BrMaskerModule } from 'br-mask';
import { FeedCommentComponent } from './public-feed/feed-comment/feed-comment.component';
import { FeedCommentService } from 'src/app/services/feed-reaction.service';
import { PublicationComponent } from './public-feed/publication/publication.component';
import { DirectivesModule } from 'src/app/directives/directives.module';
import { ResourcesModule } from 'src/app/resources/resources.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FeedPageRoutingModule,
    ResourcesModule,
    AngularFireMessagingModule,
    BrMaskerModule,
    DirectivesModule,
  ],
  declarations: [
    FeedPage,
    CreateFeedComponent,
    PublicFeedComponent,
    MenuPostComponent,
    FeedCommentComponent,
    PublicationComponent,
  ],
  providers: [
    DatabaseService,
    LoginService,
    MessagingService,
    FeedCommentService,
  ],
  exports: [FeedPage],
})
export class FeedPageModule {}
