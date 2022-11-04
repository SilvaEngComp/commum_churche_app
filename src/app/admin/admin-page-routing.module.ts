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
          import('./user/user.module').then((m) => m.UserPageModule),
      },

      {
        path: 'feed',
        loadChildren: () =>
          import('./feed/feed.module').then((m) => m.FeedPageModule),
      },

      {
        path: 'more',
        loadChildren: () =>
          import('./more/more.module').then((m) => m.MorePageModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminPagePageRoutingModule {}
