import { ResourcesModule } from 'src/app/resources/resources.module';
import { DirectivesModule } from 'src/app/directives/directives.module';
import { ChurchScheduleModule } from './church-schedule/church-schedule-admin/church-schedule.module';
import { FeedAdminPageModule } from './feed/feed-admin/feed.module';
import { BibleProgramModule } from './bible-program/bible-program-admin/bible-program-admin.module';
import { MorePageModule } from './more/more.module';
import { FinancyModule } from './financy/financy.module';
import { AdminPagePageRoutingModule } from './admin-page-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminSelectorComponent } from './menu/admin-selector/admin-selector.component';
import { AdminSmallComponent } from './menu/admin-small/admin-small.component';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { UserPageModule } from './user/user.module';
import { TutorialComponent } from './tutorial/tutorial.component';

@NgModule({
  declarations: [
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
    FeedAdminPageModule,
    ChurchScheduleModule,
    DirectivesModule,
    ResourcesModule,
  ],
  exports: [AdminSelectorComponent],
})
export class AdminModule {}
