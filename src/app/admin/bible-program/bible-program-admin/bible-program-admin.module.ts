import { ProgramReadersComponent } from './../program-report/program-readers/program-readers.component';
import { DirectivesModule } from '../../../directives/directives.module';
import { BibleVersesComponent } from '../daily-reader/bible-verses/bible-verses.component';
import { DailyReaderComponent } from '../daily-reader/daily-reader.component';
import { BibleProgramAdminComponent } from './bible-program-admin.component';
import { BibleProgramMapComponent } from '../program-report/bible-program-map/bible-program-map.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { BibleProgramComponent } from '../program-report/bible-program.component';

@NgModule({
  declarations: [
    BibleProgramComponent,
    BibleProgramMapComponent,
    BibleProgramAdminComponent,
    DailyReaderComponent,
    BibleVersesComponent,
    ProgramReadersComponent,
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
