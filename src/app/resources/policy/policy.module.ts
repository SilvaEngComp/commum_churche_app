import { ReaderOptionsComponent } from './reader-options/reader-options.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PolicyComponent } from './policy.component';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [PolicyComponent, ReaderOptionsComponent],
  imports: [CommonModule, FormsModule, IonicModule],
  entryComponents: [ReaderOptionsComponent],
})
export class PolicyModule { }
