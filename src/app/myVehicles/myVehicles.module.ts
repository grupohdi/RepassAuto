import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyVehiclesPageRoutingModule } from './myVehicles-routing.module';

import { MyVehiclesPage } from './myVehicles.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyVehiclesPageRoutingModule
  ],
  declarations: [MyVehiclesPage]
})
export class MyVehiclesPageModule {}
