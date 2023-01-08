import { ResourcesModule } from './../../resources/resources.module';
import { LoadImagesComponent } from './../../resources/load-images/load-images.component';
/* eslint-disable max-len */
import { FilterComponent } from './filter/filter.component';
import { HomeUserRegisterModule } from './../../home/home-user-register/home-user-register.module';
import { ProfileComponent } from './profile/profile.component';
import { PipesModule } from '../../pipes/pipes.module';
import { UserService } from '../../services/user.service';
import { UserRegisterComponent } from './user-register/user-register.component';
import { BrMaskerModule } from 'br-mask';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserPageRoutingModule } from './user-routing.module';

import { UserPage } from './user.page';
import { UserAdminComponent } from './user-admin/user-admin.component';
import { UserSearchModule } from './user-search/user-search.module';
import { EmergencyUserRegisterComponent } from './user-register/emergency-user-register/emergency-user-register.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserPageRoutingModule,
    BrMaskerModule,
    ReactiveFormsModule,
    PipesModule,
    UserSearchModule,
    HomeUserRegisterModule,
    ResourcesModule,
  ],
  declarations: [
    UserPage,
    UserAdminComponent,
    UserRegisterComponent,
    ProfileComponent,
    FilterComponent,
    EmergencyUserRegisterComponent,
  ],
  exports: [
    UserAdminComponent,
    UserPage,
    UserRegisterComponent,
    ProfileComponent,
  ],
  providers: [UserService],
})
export class UserPageModule {}
