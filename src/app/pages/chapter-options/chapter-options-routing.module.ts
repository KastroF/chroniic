import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChapterOptionsPage } from './chapter-options.page';

const routes: Routes = [
  {
    path: '',
    component: ChapterOptionsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChapterOptionsPageRoutingModule {}
