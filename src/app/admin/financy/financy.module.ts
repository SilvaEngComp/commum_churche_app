import { CaixaModule } from './caixa/caixa.module';
import { FinancyAdminComponent } from './financy-admin/financy-admin.component';
import { TitheModule } from './tithe/tithe.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [FinancyAdminComponent],
  imports: [CommonModule, TitheModule, CaixaModule],
  exports: [FinancyAdminComponent],
})
export class FinancyModule {}
