import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SwiperModule } from 'swiper/angular';
import { IonicModule } from '@ionic/angular';

import { VehicleFullPageRoutingModule } from './vehicle-full-routing.module';

import { VehicleFullPage } from './vehicle-full.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SwiperModule,
    VehicleFullPageRoutingModule
  ],
  declarations: [VehicleFullPage]
})
export class VehicleFullPageModule {}
