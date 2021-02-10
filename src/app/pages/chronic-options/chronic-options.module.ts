import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChronicOptionsPageRoutingModule } from './chronic-options-routing.module';

import { ChronicOptionsPage } from './chronic-options.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChronicOptionsPageRoutingModule
  ],
  declarations: [ChronicOptionsPage]
})
export class ChronicOptionsPageModule {}
