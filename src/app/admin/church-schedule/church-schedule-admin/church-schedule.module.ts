import { UiModule } from './../../../ui/ui.module';
import { DirectivesModule } from 'src/app/directives/directives.module';
import { ChurchScheduleComponent } from './church-schedule.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { BrMaskerModule } from 'br-mask';
import { PublicChurchScheduleComponent } from '../public-church-schedule/public-church-schedule.component';
import { CreateChurchScheduleComponent } from '../create-church-schedule/create-church-schedule.component';
import { EditTextChurchScheduleComponent } from '../create-church-schedule/edit-text-church-schedule/edit-text-church-schedule.component';
import { PublicationChurchScheduleComponent } from '../public-church-schedule/publication/publicationapp-church-schedule.component';
import { MenuPostChurchScheduleComponent } from '../public-church-schedule/menu-post-church-schedule/menu-post-church-schedule.component';
import { ResourcesModule } from 'src/app/resources/resources.module';
import { ScheduleTypeRegisterComponent } from '../schedule-type-register/schedule-type-register.component';

@NgModule({
  declarations: [
    ChurchScheduleComponent,
    EditTextChurchScheduleComponent,
    CreateChurchScheduleComponent,
    PublicChurchScheduleComponent,
    PublicationChurchScheduleComponent,
    MenuPostChurchScheduleComponent,
    ScheduleTypeRegisterComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BrMaskerModule,
    ReactiveFormsModule,
    ResourcesModule,
    DirectivesModule,
    UiModule,
  ],
  exports: [ChurchScheduleComponent],
})
export class ChurchScheduleModule {}
