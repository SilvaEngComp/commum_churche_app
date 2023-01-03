import { TutorialComponent } from './tutorial.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [TutorialComponent],
  imports: [CommonModule, FormsModule, IonicModule, ReactiveFormsModule],
  exports: [TutorialComponent],
})
export class TutorialModule {}
