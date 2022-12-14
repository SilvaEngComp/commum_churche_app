import { CurrencyBrlPipe } from './currency-brl.pipe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhonePipe } from './phone.pipe';

@NgModule({
  declarations: [CurrencyBrlPipe, PhonePipe],
  imports: [CommonModule],
  exports: [CurrencyBrlPipe, PhonePipe],
})
export class PipesModule {}
