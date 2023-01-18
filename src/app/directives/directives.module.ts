import { NoPermissionDirective } from './no-permission.directive';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PermissionDirective } from './permission.directive';
import { CopyClipboardDirective } from './copy-clipboard.directive';
import { IonicModule } from '@ionic/angular';
import { LongPressActionDirective } from './long-press-action.directive';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    PermissionDirective,
    CopyClipboardDirective,
    LongPressActionDirective,
    NoPermissionDirective,
  ],

  imports: [CommonModule, FormsModule, IonicModule, ReactiveFormsModule],
  exports: [
    PermissionDirective,
    CopyClipboardDirective,
    LongPressActionDirective,
    NoPermissionDirective,
  ],
  providers: [PermissionDirective, LongPressActionDirective],
})
export class DirectivesModule {}
