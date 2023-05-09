import { CurrencyBrlPipe } from './currency-brl.pipe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhonePipe } from './phone.pipe';
import { DateAgoPipe } from './date-ago.pipe';

@NgModule({
  declarations: [CurrencyBrlPipe, PhonePipe, DateAgoPipe],
  imports: [CommonModule],
  exports: [CurrencyBrlPipe, PhonePipe, DateAgoPipe],
})
export class PipesModule {}
