import { TitheSummaryComponent } from './report/tithe-summary/tithe-summary.component';
import { CaixaSummaryComponent } from './report/caixa-summary/caixa-summary.component';
import { ReportComponent } from './report/report.component';
import { CaixaComponent } from './caixa/caixa.component';
import { TitheComponent } from './tithe/tithe.component';
import { CaixaModule } from './caixa/caixa.module';
import { FinancyAdminComponent } from './financy-admin/financy-admin.component';
import { TitheModule } from './tithe/tithe.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { BrMaskerModule } from 'br-mask';
import { PipesModule } from 'src/app/pipes/pipes.module';

@NgModule({
  declarations: [
    FinancyAdminComponent,
    ReportComponent,
    CaixaSummaryComponent,
    TitheSummaryComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BrMaskerModule,
    ReactiveFormsModule,
    PipesModule,
    TitheModule,
    CaixaModule,
  ],
  exports: [FinancyAdminComponent, TitheComponent],
})
export class FinancyModule {}
