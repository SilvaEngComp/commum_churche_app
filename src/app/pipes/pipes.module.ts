import { CurrencyBrlPipe } from './currency-brl.pipe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [CurrencyBrlPipe],
  imports: [
    CommonModule
  ],
  exports: [
    CurrencyBrlPipe
  ]
})
export class PipesModule { }
