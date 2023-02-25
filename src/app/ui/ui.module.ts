import { WelcomeComponent } from './welcome/welcome.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InfoComponent } from './info/info.component';
import { MySelectListComponent } from './my-select-list/my-select-list.component';
import { FinishActionComponent } from './finish-action/finish-action.component';

@NgModule({
  declarations: [
    InfoComponent,
    MySelectListComponent,
    FinishActionComponent,
    WelcomeComponent,
  ],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, IonicModule],
  exports: [InfoComponent, MySelectListComponent, FinishActionComponent],
})
export class UiModule {}
