import { SplashScreamModule } from './home/splash-scream/splash-scream.module';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuardAdmin } from './guards/guardAdmin';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'splash-scream',
    pathMatch: 'full',
  },
  {
    path: 'splash-scream',
    loadChildren: () =>
      import('./home/splash-scream/splash-scream.module').then(
        (m) => m.SplashScreamModule
      ),
  },
  {
    path: 'home',
    canActivate: [AuthGuardAdmin],
    loadChildren: () =>
      import('./home/menu/menu.module').then((m) => m.MenuHomeModule),
  },

  {
    path: 'admin',
    loadChildren: () =>
      import('./admin/admin.module').then((m) => m.AdminModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
