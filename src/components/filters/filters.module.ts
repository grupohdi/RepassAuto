import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { FiltersComponentRoutingModule } from './filters-routing.module';

import { FiltersComponent } from './filters.component';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    BrowserModule,
    IonicModule,
    FiltersComponentRoutingModule
  ],
  declarations: [FiltersComponent]
})
export class FiltersComponentModule {}
