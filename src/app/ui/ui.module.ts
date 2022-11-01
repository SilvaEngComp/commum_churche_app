import { FinishActionComponent } from './finish-action/finish-action.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InfoComponent } from './info/info.component';
import { MySelectListComponent } from './my-select-list/my-select-list.component';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
@NgModule({
  declarations: [InfoComponent, MySelectListComponent, FinishActionComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    TooltipModule.forRoot(),
  ],
  exports: [InfoComponent, MySelectListComponent],
})
export class UiModule {}
