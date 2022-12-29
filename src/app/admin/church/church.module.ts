import { ChurchRegisterComponent } from './church-register/church-register.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { BrMaskerModule } from 'br-mask';

@NgModule({
  declarations: [ChurchRegisterComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BrMaskerModule,
    ReactiveFormsModule,
  ],
  exports: [ChurchRegisterComponent],
})
export class ChurchModule {}
