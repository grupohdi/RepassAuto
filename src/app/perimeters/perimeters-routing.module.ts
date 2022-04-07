import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PerimetersPage } from './perimeters.page';

const routes: Routes = [
  {
    path: '',
    component: PerimetersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PerimetersPageRoutingModule {}
