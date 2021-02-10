import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChronicOptionsPage } from './chronic-options.page';

const routes: Routes = [
  {
    path: '',
    component: ChronicOptionsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChronicOptionsPageRoutingModule {}
