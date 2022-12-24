import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MorePageRoutingModule } from './more-routing.module';

import { MorePage } from './more.page';
import { DirectivesModule } from 'src/app/directives/directives.module';
import { PolicyModule } from 'src/app/resources/policy/policy.module';
import { ResourcesModule } from 'src/app/resources/resources.module';
import { SocialSharing } from '@awesome-cordova-plugins/social-sharing/ngx';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MorePageRoutingModule,
    ResourcesModule,
    PolicyModule,
    DirectivesModule,
  ],
  declarations: [MorePage],
  exports: [MorePage],
  providers: [SocialSharing],
})
export class MorePageModule {}
