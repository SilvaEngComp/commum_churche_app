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
import { ReportComponent } from './financy-summary/financy-summary.component';
import { CaixaSummaryComponent } from './financy-summary/caixa-summary/caixa-summary.component';
import { TitheSummaryComponent } from './financy-summary/tithe-summary/tithe-summary.component';

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
  exports: [FinancyAdminComponent, TitheComponent, TitheRegisterComponent],
})
export class FinancyModule {}
