import { MenuTitheComponent } from './menu-tithe/menu-tithe.component';
import { UiModule } from './../../../ui/ui.module';
import { FilterTitheComponent } from './filter-tithe/filter-tithe.component';
import { TitheRegisterComponent } from './tithe-register/tithe-register.component';
import { TitheComponent } from './tithe.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { BrMaskerModule } from 'br-mask';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { DirectivesModule } from 'src/app/directives/directives.module';

@NgModule({
  declarations: [
    TitheComponent,
    TitheRegisterComponent,
    FilterTitheComponent,
    MenuTitheComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BrMaskerModule,
    ReactiveFormsModule,
    PipesModule,
    DirectivesModule,
    UiModule,
  ],
  exports: [TitheComponent, TitheRegisterComponent],
})
export class TitheModule {}
