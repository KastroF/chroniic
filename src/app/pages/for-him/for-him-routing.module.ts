import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ForHimPage } from './for-him.page';

const routes: Routes = [
  {
    path: '',
    component: ForHimPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ForHimPageRoutingModule {}
