import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FinancyReportComponent } from './financy-report.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { BrMaskerModule } from 'br-mask';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { UiModule } from 'src/app/ui/ui.module';
import { ChurchModule } from '../../church/church.module';
import { CaixaModule } from '../caixa/caixa.module';
import { TitheModule } from '../tithe/tithe.module';

@NgModule({
  declarations: [FinancyReportComponent],
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
  ],
  exports: [FinancyReportComponent],
})
export class FinancyReportModule {}
