import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChapterOptionsPageRoutingModule } from './chapter-options-routing.module';

import { ChapterOptionsPage } from './chapter-options.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChapterOptionsPageRoutingModule
  ],
  declarations: [ChapterOptionsPage]
})
export class ChapterOptionsPageModule {}
