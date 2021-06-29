import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BookDetailComponent } from './book-detail.component';

const routes: Routes = [
  { path: '', component: BookDetailComponent },
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
export class BookDetailRoutingModule {}
