import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChronicPageRoutingModule } from './chronic-routing.module';

import { ChronicPage } from './chronic.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChronicPageRoutingModule
  ],
  declarations: [ChronicPage]
})
export class ChronicPageModule {}
