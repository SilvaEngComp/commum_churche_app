import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryManagerComponent } from './category-manager.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { BrMaskerModule } from 'br-mask';
import { UiModule } from 'src/app/ui/ui.module';

@NgModule({
  declarations: [CategoryManagerComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BrMaskerModule,
    ReactiveFormsModule,
    UiModule,
  ],
  exports: [CategoryManagerComponent],
})
export class CategoryManagerModule {}
