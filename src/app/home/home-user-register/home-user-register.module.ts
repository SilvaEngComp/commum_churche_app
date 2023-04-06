import { RegisterJustificationComponent } from './register-justification/register-justification.component';
import { RegisterLoginComponent } from './register-login/register-login.component';
import { RegisterPersonalInfoComponent } from './register-personal-info/register-personal-info.component';
import { RegisterContactComponent } from './register-contact/register-contact.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { BrMaskerModule } from 'br-mask';
import { HomeUserRegisterComponent } from './home-user-register.component';
import { ResourcesModule } from 'src/app/resources/resources.module';

@NgModule({
  declarations: [
    RegisterContactComponent,
    RegisterPersonalInfoComponent,
    RegisterLoginComponent,
    HomeUserRegisterComponent,
    RegisterJustificationComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    BrMaskerModule,
    ResourcesModule,
  ],
  exports: [HomeUserRegisterComponent],
})
export class HomeUserRegisterModule {}
