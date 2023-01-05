import { ChurchScheduleModule } from './church-schedule/church-schedule-admin/church-schedule.module';
import { FeedPageModule } from './feed/feed-admin/feed.module';
import { BibleProgramModule } from './bible-program/bible-program.module';
import { MorePageModule } from './more/more.module';
import { FinancyModule } from './financy/financy.module';
import { AdminPagePageRoutingModule } from './admin-page-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminLargeComponent } from './menu/admin-large/admin-large.component';
import { AdminSelectorComponent } from './menu/admin-selector/admin-selector.component';
import { AdminSmallComponent } from './menu/admin-small/admin-small.component';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { UserPageModule } from './user/user.module';
import { TutorialComponent } from './tutorial/tutorial.component';

@NgModule({
  declarations: [
    AdminLargeComponent,
    AdminSelectorComponent,
    AdminSmallComponent,
    TutorialComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminPagePageRoutingModule,
    UserPageModule,
    FinancyModule,
    MorePageModule,
    BibleProgramModule,
    FeedPageModule,
    ChurchScheduleModule,
  ],
  exports: [AdminSelectorComponent],
})
export class AdminModule {}
