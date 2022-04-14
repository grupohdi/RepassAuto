import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {LoginPage } from './login.page';

import {LoginPageRoutingModule } from './login-routing.module';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
   LoginPageRoutingModule,
    ComponentsModule
  ],
  declarations: [LoginPage]
})
export class LoginPageModule {}
