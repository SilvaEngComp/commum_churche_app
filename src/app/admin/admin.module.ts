import { AdminPagePageRoutingModule } from './admin-page-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminLargeComponent } from './menu/admin-large/admin-large.component';
import { AdminSelectorComponent } from './menu/admin-selector/admin-selector.component';
import { AdminSmallComponent } from './menu/admin-small/admin-small.component';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { UserPageModule } from './user/user.module';

@NgModule({
  declarations: [
    AdminLargeComponent,
    AdminSelectorComponent,
    AdminSmallComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminPagePageRoutingModule,
    UserPageModule,
  ],
  exports: [AdminSelectorComponent],
})
export class AdminModule {}
