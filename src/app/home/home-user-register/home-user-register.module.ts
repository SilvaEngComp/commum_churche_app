import { RegisterLoginComponent } from './register-login/register-login.component';
import { RegisterPersonalInfoComponent } from './register-personal-info/register-personal-info.component';
import { RegisterContactComponent } from './register-contact/register-contact.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { BrMaskerModule } from 'br-mask';
import { HomeUserRegisterComponent } from './home-user-register.component';

@NgModule({
  declarations: [
    RegisterContactComponent,
    RegisterPersonalInfoComponent,
    RegisterLoginComponent,
    HomeUserRegisterComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    BrMaskerModule,
  ],
  exports: [HomeUserRegisterComponent],
})
export class HomeUserRegisterModule {}
