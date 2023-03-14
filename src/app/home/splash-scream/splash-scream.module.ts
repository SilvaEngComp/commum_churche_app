import { SplashScreamComponent } from './splash-scream.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SplashScreamPageRoutingModule } from './splash-scream-routing.module';

@NgModule({
  declarations: [SplashScreamComponent],
  imports: [CommonModule, SplashScreamPageRoutingModule],
  exports: [SplashScreamComponent],
})
export class SplashScreamModule {}
