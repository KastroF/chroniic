import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChronicDetailsPageRoutingModule } from './chronic-details-routing.module';
import { SlickCarouselModule } from 'ngx-slick-carousel';

import { ChronicDetailsPage } from './chronic-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SlickCarouselModule,
    IonicModule,
    ChronicDetailsPageRoutingModule
  ],
  declarations: [ChronicDetailsPage]
})
export class ChronicDetailsPageModule {}
