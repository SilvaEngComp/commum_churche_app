import { ColorMarkerComponent } from '../../directives/color-marker/color-marker.component';
import { DirectivesModule } from './../../directives/directives.module';
import { BibleVersesComponent } from './bible-verses/bible-verses.component';
import { DailyReaderComponent } from './daily-reader/daily-reader.component';
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
    DailyReaderComponent,
    BibleVersesComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    DirectivesModule,
  ],
  exports: [BibleProgramAdminComponent],
})
export class BibleProgramModule {}
