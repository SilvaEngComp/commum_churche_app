import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CaixaViewTableComponent } from './caixa-view-table/caixa-view-table.component';
import { TitheViewTableComponent } from './tithe-view-table/tithe-view-table.component';
import { RegisterByExcelComponent } from './register-by-excel.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { BrMaskerModule } from 'br-mask';
import { FileUploadModule } from 'ng2-file-upload';
import { PipesModule } from 'src/app/pipes/pipes.module';

@NgModule({
  declarations: [
    RegisterByExcelComponent,
    CaixaViewTableComponent,
    TitheViewTableComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BrMaskerModule,
    ReactiveFormsModule,
    PipesModule,
    FileUploadModule,
  ],
  exports: [RegisterByExcelComponent],
})
export class RegisterByExcelModule {}
