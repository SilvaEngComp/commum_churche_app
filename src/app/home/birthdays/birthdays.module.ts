import { DirectivesModule } from './../../directives/directives.module';
import { BirthdaysComponent } from './birthdays.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [BirthdaysComponent],
  imports: [CommonModule, FormsModule, IonicModule, DirectivesModule],
  exports: [BirthdaysComponent],
})
export class BirthdaysModule {}
