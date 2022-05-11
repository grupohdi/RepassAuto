import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SwiperModule } from 'swiper/angular';
import { IonicModule } from '@ionic/angular';

import { PerimeterPageRoutingModule } from './perimeter-routing.module';

import { PerimeterPage } from './perimeter.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SwiperModule,
    PerimeterPageRoutingModule
  ],
  declarations: [PerimeterPage]
})
export class PerimeterPageModule {}
