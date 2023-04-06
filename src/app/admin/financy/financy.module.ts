import { UiModule } from './../../ui/ui.module';
import { ExpenseComponent } from './financy-summary/expense/expense.component';
import { BalanceComponent } from './financy-summary/balance/balance.component';
import { MenuCaixaSummaryComponent } from './financy-summary/menu-caixa-summary/menu-caixa-summary.component';
import { ChurchModule } from './../church/church.module';
import { MenuSummaryComponent } from './financy-summary/menu-summary/menu-summary.component';
import { TitheRegisterComponent } from './tithe/tithe-register/tithe-register.component';
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
import { FinancySummaryComponent } from './financy-summary/financy-summary.component';
import { CaixaSummaryComponent } from './financy-summary/caixa-summary/caixa-summary.component';
import { TitheSummaryComponent } from './financy-summary/tithe-summary/tithe-summary.component';
import { FinancyReportModule } from './financy-report/financy-report.module';
import { DirectivesModule } from 'src/app/directives/directives.module';

@NgModule({
  declarations: [
    FinancyAdminComponent,
    FinancySummaryComponent,
    CaixaSummaryComponent,
    TitheSummaryComponent,
    MenuSummaryComponent,
    MenuCaixaSummaryComponent,
    BalanceComponent,
    ExpenseComponent,
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
    ChurchModule,
    UiModule,
    FinancyReportModule,
    DirectivesModule,
  ],
  exports: [FinancyAdminComponent, TitheComponent, TitheRegisterComponent],
  providers: [],
})
export class FinancyModule {}
