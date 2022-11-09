import { RequestEmailComponent } from './request-email/request-email.component';
import { BrMaskerModule } from 'br-mask';
import { LoginComponent } from './login.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RevoverPasswordComponent } from './esqueci-senha/recover-password.component';
import { UpdatePasswordComponent } from './esqueci-senha/update-password/update-password.component';
import { CodeValidationComponent } from './esqueci-senha/code-validation/code-validation.component';

@NgModule({
  declarations: [
    RequestEmailComponent,
    LoginComponent,
    RevoverPasswordComponent,
    CodeValidationComponent,
    UpdatePasswordComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BrMaskerModule,
    ReactiveFormsModule,
  ],
  exports: [LoginComponent],
})
export class LoginModule {}
