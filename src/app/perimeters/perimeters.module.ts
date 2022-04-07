import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PerimetersPageRoutingModule } from './perimeters-routing.module';

import { PerimetersPage } from './perimeters.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PerimetersPageRoutingModule
  ],
  declarations: [PerimetersPage]
})
export class PerimetersPageModule {}
