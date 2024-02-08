import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FinancyReportComponent } from './financy-report.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { BrMaskerModule } from 'br-mask';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { UiModule } from 'src/app/ui/ui.module';
import { GeneralSummaryComponent } from './general-summary-graph/general-summary-graph.component';
import { InputsGraphComponent } from './inputs-graph/inputs-graph.component';
import { OutputsGraphComponent } from './outputs-graph/outputs-graph.component';
import { BalancePeriodGraphComponent } from './balance-period-graph/balance-period-graph.component';
import { BalanceTrimestralGraphComponent } from './balance-trimestral-graph/balance-trimestral-graph.component';

@NgModule({
  declarations: [
    FinancyReportComponent,
    GeneralSummaryComponent,
    InputsGraphComponent,
    OutputsGraphComponent,
    BalancePeriodGraphComponent,
    BalanceTrimestralGraphComponent,
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
  exports: [FinancyReportComponent],
})
export class FinancyReportModule {}
