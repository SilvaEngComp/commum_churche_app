import { BirthdaysModule } from './../../home/birthdays/birthdays.module';
import { UserHomeComponent } from './user-home/user-home.component';
import { ResourcesModule } from './../../resources/resources.module';
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
import { RegisterCardComponent } from './user-register/register-personal-info/register-card.component';
import { DirectivesModule } from 'src/app/directives/directives.module';

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
    BirthdaysModule,
    DirectivesModule,
  ],
  declarations: [
    UserPage,
    UserAdminComponent,
    UserRegisterComponent,
    ProfileComponent,
    FilterComponent,
    EmergencyUserRegisterComponent,
    UserHomeComponent,
    RegisterCardComponent,
  ],
  exports: [
    UserAdminComponent,
    UserHomeComponent,
    UserPage,
    UserRegisterComponent,
    ProfileComponent,
  ],
  providers: [UserService],
})
export class UserPageModule {}
