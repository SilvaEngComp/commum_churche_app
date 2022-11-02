import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminSelectorComponent } from './menu/admin-selector/admin-selector.component';

const routes: Routes = [
  {
    path: '',
    component: AdminSelectorComponent,
    children: [
      {
        path: 'user',
        loadChildren: () =>
          import('./usuarios/user.module').then((m) => m.UserPageModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminPagePageRoutingModule {}
