import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SwiperModule } from 'swiper/angular';

import { OffersPageRoutingModule } from './offers-routing.module';
import { OffersPage } from './offers.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SwiperModule,
    OffersPageRoutingModule,

  ],
  declarations: [OffersPage]
})
export class OffersPageModule {}
