import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FeedAdminPage } from './feed.page';

const routes: Routes = [
  {
    path: '',
    component: FeedAdminPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FeedAdminPageRoutingModule {}
