import { BibleProgramAdminComponent } from './bible-program-admin/bible-program-admin.component';
import { BibleProgramMapComponent } from './bible-program-map/bible-program-map.component';
import { BibleProgramComponent } from './bible-program.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { BrMaskerModule } from 'br-mask';
import { UserPageRoutingModule } from '../user/user-routing.module';

@NgModule({
  declarations: [
    BibleProgramComponent,
    BibleProgramMapComponent,
    BibleProgramAdminComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserPageRoutingModule,
    BrMaskerModule,
    ReactiveFormsModule,
  ],
  exports: [BibleProgramAdminComponent],
})
export class BibleProgramModule {}
