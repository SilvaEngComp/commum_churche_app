import { NoPermissionDirective } from './no-permission.directive';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PermissionDirective } from './permission.directive';
import { CopyClipboardDirective } from './copy-clipboard.directive';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    PermissionDirective,
    CopyClipboardDirective,
    NoPermissionDirective,
  ],

  imports: [CommonModule, FormsModule, IonicModule, ReactiveFormsModule],
  exports: [PermissionDirective, CopyClipboardDirective, NoPermissionDirective],
  providers: [PermissionDirective],
})
export class DirectivesModule {}
