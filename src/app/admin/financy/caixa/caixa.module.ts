import { FilterCaixaComponent } from './filter-caixa/filter-caixa.component';
import { CaixaRegisterComponent } from './caixa-register/caixa-register.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { BrMaskerModule } from 'br-mask';
import { PipesModule } from 'src/app/pipes/pipes.module';

@NgModule({
  declarations: [CaixaRegisterComponent, FilterCaixaComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BrMaskerModule,
    ReactiveFormsModule,
    PipesModule,
  ],
  exports: [CaixaRegisterComponent],
})
export class CaixaModule {}
