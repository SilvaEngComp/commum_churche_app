import { CaixaHomeComponent } from './caixa-home/caixa-home.component';
import { CaixaComponent } from './caixa.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { BrMaskerModule } from 'br-mask';
import { PipesModule } from 'src/app/pipes/pipes.module';

@NgModule({
  declarations: [CaixaComponent, CaixaHomeComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BrMaskerModule,
    ReactiveFormsModule,
    PipesModule,
  ],
  exports: [CaixaHomeComponent],
})
export class CaixaModule {}
