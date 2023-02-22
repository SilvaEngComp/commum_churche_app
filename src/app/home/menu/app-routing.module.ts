import { MenuHomeSelectComponent } from './menu-home-select/menu-home-select.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: MenuHomeSelectComponent,
    children: [
      {
        path: 'register',
        loadChildren: () =>
          import('./../home-user-register/home-user-register.module').then(
            (m) => m.HomeUserRegisterModule
          ),
      },
      {
        path: 'login',
        loadChildren: () =>
          import('./../login/admin/login-admin.module').then(
            (m) => m.LoginModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
