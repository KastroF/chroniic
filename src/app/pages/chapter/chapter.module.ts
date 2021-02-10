import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

import { ChapterPageRoutingModule } from './chapter-routing.module';

import { ChapterPage } from './chapter.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChapterPageRoutingModule, 
    CKEditorModule
  ],
  declarations: [ChapterPage]
})
export class ChapterPageModule {}
