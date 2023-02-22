import { BrMaskerModule } from 'br-mask';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CodeValidationComponent } from '../esqueci-senha/code-validation/code-validation.component';
import { RevoverPasswordComponent } from '../esqueci-senha/recover-password.component';
import { UpdatePasswordComponent } from '../esqueci-senha/update-password/update-password.component';
import { LoginComponent } from '../login/login.component';
import { LoginAdminComponent } from './login-admin.component';

@NgModule({
  declarations: [
    LoginAdminComponent,
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
  exports: [LoginAdminComponent],
})
export class LoginModule {}
