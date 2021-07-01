import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BillingInfoComponent } from './billing-info.component';

const routes: Routes = [
  { path: '', component: BillingInfoComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BillingInfoRoutingModule {}
