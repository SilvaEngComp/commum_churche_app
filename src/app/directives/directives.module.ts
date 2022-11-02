import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PermissionDirective } from './permission.directive';
import { CopyClipboardDirective } from './copy-clipboard.directive';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [PermissionDirective, CopyClipboardDirective],
  imports: [
    CommonModule,
    IonicModule,
  ],
  exports: [PermissionDirective, CopyClipboardDirective]
})
export class DirectivesModule { }
