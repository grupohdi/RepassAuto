import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SwiperModule } from 'swiper/angular';
import { IonicModule } from '@ionic/angular';

import { MyOffersPageRoutingModule } from './myOffers-routing.module';

import { MyOffersPage } from './myOffers.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SwiperModule,
    MyOffersPageRoutingModule
  ],
  declarations: [MyOffersPage]
})
export class MyOffersPageModule {}
