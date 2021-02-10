import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChronicPage } from './chronic.page';

const routes: Routes = [
  {
    path: '',
    component: ChronicPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChronicPageRoutingModule {}
