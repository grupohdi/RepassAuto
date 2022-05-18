import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SwiperModule } from 'swiper/angular';
import { IonicModule } from '@ionic/angular';

import { MyOfferPageRoutingModule } from './myOffer-routing.module';

import { MyOfferPage } from './myOffer.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SwiperModule,
    MyOfferPageRoutingModule
  ],
  declarations: [MyOfferPage]
})
export class MyOfferPageModule {}
