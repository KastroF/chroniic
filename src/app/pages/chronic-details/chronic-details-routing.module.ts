import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChronicDetailsPage } from './chronic-details.page';

const routes: Routes = [
  {
    path: '',
    component: ChronicDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChronicDetailsPageRoutingModule {}
