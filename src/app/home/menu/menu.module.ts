import { BrMaskerModule } from 'br-mask';
import { HomePageRoutingModule } from './home-page-routing.module';
import { LoginModule } from './../login/login.module';
import { MenuHomeSmallComponent } from './menu-home-small/menu-home-small.component';
import { MenuHomeSelectComponent } from './menu-home-select/menu-home-select.component';
import { MenuHomeLargeComponent } from './menu-home-large/menu-home-large.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HomeUserRegisterComponent } from '../home-user-register/home-user-register.component';
import { HomePageModule } from '../home/home.module';

@NgModule({
  declarations: [
    MenuHomeLargeComponent,
    MenuHomeSelectComponent,
    MenuHomeSmallComponent,
    HomeUserRegisterComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    HomePageModule,
    LoginModule,
    HomePageRoutingModule,
    BrMaskerModule,
  ],
  exports: [MenuHomeSelectComponent],
})
export class MenuHomeModule {}
