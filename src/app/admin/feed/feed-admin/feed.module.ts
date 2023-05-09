import { FeedHomeComponent } from './../feed-home/feed-home.component';
import { ReviewFeedComponent } from './../create-feed/review-feed/review-feed.component';
import { EditTextFeedComponent } from '../create-feed/edit-text-feed/edit-text-feed.component';
import { MenuPostComponent } from '../public-feed/menu-post/menu-post.component';
import { PublicFeedComponent } from '../public-feed/public-feed.component';
import { CreateFeedComponent } from '../create-feed/create-feed.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FeedAdminPageRoutingModule } from './feed-routing.module';

import { FeedAdminPage } from './feed.page';
import { DatabaseService } from 'src/app/services/database.service';
import { LoginService } from 'src/app/services/login.service';
import { MessagingService } from 'src/app/services/messaging.service';
import { AngularFireMessagingModule } from '@angular/fire/compat/messaging';
import { BrMaskerModule } from 'br-mask';
import { FeedCommentService } from 'src/app/services/feed-reaction.service';
import { PublicationComponent } from '../public-feed/publication/publication.component';
import { DirectivesModule } from 'src/app/directives/directives.module';
import { ResourcesModule } from 'src/app/resources/resources.module';
import { PipesModule } from 'src/app/pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FeedAdminPageRoutingModule,
    ResourcesModule,
    AngularFireMessagingModule,
    BrMaskerModule,
    DirectivesModule,
    PipesModule,
  ],
  declarations: [
    FeedAdminPage,
    CreateFeedComponent,
    PublicFeedComponent,
    MenuPostComponent,
    PublicationComponent,
    EditTextFeedComponent,
    ReviewFeedComponent,
    FeedHomeComponent,
  ],
  providers: [
    DatabaseService,
    LoginService,
    MessagingService,
    FeedCommentService,
  ],
  exports: [FeedAdminPage],
})
export class FeedAdminPageModule {}
