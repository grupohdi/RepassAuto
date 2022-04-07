import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyOffersPage } from './myOffers.page';

const routes: Routes = [
  {
    path: '',
    component: MyOffersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyOffersPageRoutingModule {}
