import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmailCodeComponent } from './email-code/email-code.component';
import { LoadImagesComponent } from './load-images/load-images.component';
import { ValidCodeComponent } from './valid-code/valid-code.component';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { FileUploadModule } from 'ng2-file-upload';



@NgModule({
  declarations: [EmailCodeComponent, ValidCodeComponent, LoadImagesComponent,],
  imports: [
    CommonModule, IonicModule, FileUploadModule, FormsModule,
  ],
  exports: [LoadImagesComponent, ValidCodeComponent, EmailCodeComponent,],
  entryComponents: [LoadImagesComponent],
})
export class ResourcesModule { }
