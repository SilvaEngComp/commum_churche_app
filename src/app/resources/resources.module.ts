import { CommentMakerComponent } from './color-manager/comment-maker/comment-maker.component';
import { ColorManagerComponent } from './color-manager/color-manager.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmailCodeComponent } from './email-code/email-code.component';
import { LoadImagesComponent } from './load-images/load-images.component';
import { ValidCodeComponent } from './valid-code/valid-code.component';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { FileUploadModule } from 'ng2-file-upload';
import { ColorMarkerComponent } from './color-manager/color-marker/color-marker.component';
import { DayToSelectComponent } from './day-to-select/day-to-select.component';

@NgModule({
  declarations: [
    EmailCodeComponent,
    ValidCodeComponent,
    LoadImagesComponent,
    ColorManagerComponent,
    ColorMarkerComponent,
    CommentMakerComponent,
    DayToSelectComponent,
  ],
  imports: [CommonModule, IonicModule, FileUploadModule, FormsModule],
  exports: [
    LoadImagesComponent,
    ValidCodeComponent,
    EmailCodeComponent,
    ColorManagerComponent,
    DayToSelectComponent,
  ],
  entryComponents: [LoadImagesComponent, DayToSelectComponent],
})
export class ResourcesModule {}
