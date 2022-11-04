import { BrMaskerModule } from 'br-mask';
import { LoginModule } from './../login/login.module';
import { MenuHomeSmallComponent } from './menu-home-small/menu-home-small.component';
import { MenuHomeSelectComponent } from './menu-home-select/menu-home-select.component';
import { MenuHomeLargeComponent } from './menu-home-large/menu-home-large.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HomePageModule } from '../home/home.module';
import { HomeUserRegisterModule } from '../home-user-register/home-user-register.module';
import { HomePageRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    MenuHomeLargeComponent,
    MenuHomeSelectComponent,
    MenuHomeSmallComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    BrMaskerModule,
    HomePageModule,
    LoginModule,
    HomePageRoutingModule,
    HomeUserRegisterModule,
  ],
  exports: [MenuHomeSelectComponent],
})
export class MenuHomeModule {}
