import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyOfferPage } from './myOffer.page';

const routes: Routes = [
  {
    path: '',
    component: MyOfferPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyOfferPageRoutingModule {}
