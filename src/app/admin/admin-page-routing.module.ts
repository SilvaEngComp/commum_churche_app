import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminSelectorComponent } from './menu/admin-selector/admin-selector.component';

const routes: Routes = [
  {
    path: '',
    component: AdminSelectorComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminPagePageRoutingModule {}
