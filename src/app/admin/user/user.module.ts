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
  ],
  declarations: [
    UserPage,
    UserAdminComponent,
    UserRegisterComponent,
    ProfileComponent,
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
