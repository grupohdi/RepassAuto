import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule  } from '@angular/forms';
import { SwiperModule } from 'swiper/angular';
import { IonicModule } from '@ionic/angular';

import { VehiclePageRoutingModule } from './vehicle-routing.module';

import { VehiclePage } from './vehicle.page';
import { BrMaskerModule } from 'br-mask';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SwiperModule,
    BrMaskerModule,
    VehiclePageRoutingModule
  ],
  declarations: [VehiclePage]
})
export class VehiclePageModule {}
