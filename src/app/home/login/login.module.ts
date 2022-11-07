import { RequestEmailComponent } from './request-email/request-email.component';
import { BrMaskerModule } from 'br-mask';
import { LoginComponent } from './login.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { EsqueciSenhaComponent } from './esqueci-senha/esqueci-senha.component';
import { AlterarSenhaComponent } from './esqueci-senha/alterar-senha/alterar-senha.component';
import { ResponseComponent } from './esqueci-senha/response/response.component';

@NgModule({
  declarations: [
    RequestEmailComponent,
    LoginComponent,
    EsqueciSenhaComponent,
    ResponseComponent,
    AlterarSenhaComponent,
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
