import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SignOutPageRoutingModule } from './signOut-routing.module';

import { SignOutPage } from './signOut.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SignOutPageRoutingModule
  ],
  declarations: [SignOutPage]
})
export class SignOutPageModule {}
