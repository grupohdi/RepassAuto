import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VehicleFullPage } from './vehicle-full.page';

const routes: Routes = [
  {
    path: '',
    component: VehicleFullPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VehicleFullPageRoutingModule {}
