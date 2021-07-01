import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CartComponent } from './cart.component';

const routes: Routes = [
  { path: '', component: CartComponent },
  {
    path: 'billing-info',
    loadChildren: () =>
      import(`../billing-info/billing-info.module`).then(
        (module) => module.BillingInfoModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CartRoutingModule {}
