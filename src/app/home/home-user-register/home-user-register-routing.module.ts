import { HomeUserRegisterComponent } from './home-user-register.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'cadastro',
    component: HomeUserRegisterComponent,
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeUserRegisterRoutingModule {}
