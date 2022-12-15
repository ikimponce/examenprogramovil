import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsersAddPage } from './users-add.page';

const routes: Routes = [
  {
    path: '',
    component: UsersAddPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersAddPageRoutingModule {}
