import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PerimeterPage } from './perimeter.page';

const routes: Routes = [
  {
    path: '',
    component: PerimeterPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PerimeterPageRoutingModule {}
