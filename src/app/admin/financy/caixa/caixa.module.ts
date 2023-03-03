import { CaixaSubcategoryRegisterComponent } from './caixa-type-register/caixa-type-register.component';
import { CaixaCategoryRegisterComponent } from './caixa-group-register/caixa-group-register.component';
import { UiModule } from './../../../ui/ui.module';
import { FilterCaixaComponent } from './filter-caixa/filter-caixa.component';
import { CaixaRegisterComponent } from './caixa-register/caixa-register.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { BrMaskerModule } from 'br-mask';
import { PipesModule } from 'src/app/pipes/pipes.module';

@NgModule({
  declarations: [
    CaixaRegisterComponent,
    FilterCaixaComponent,
    CaixaCategoryRegisterComponent,
    CaixaSubcategoryRegisterComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BrMaskerModule,
    ReactiveFormsModule,
    PipesModule,
    UiModule,
  ],
  exports: [CaixaRegisterComponent],
})
export class CaixaModule {}
