import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ForHimPageRoutingModule } from './for-him-routing.module';

import { ForHimPage } from './for-him.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ForHimPageRoutingModule
  ],
  declarations: [ForHimPage]
})
export class ForHimPageModule {}
