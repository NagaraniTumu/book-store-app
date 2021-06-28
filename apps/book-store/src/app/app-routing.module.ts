import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BooksSearchComponent } from './books-search/books-search.component';
import { CartComponent } from './cart/cart.component';
import { CollectionComponent } from './collection/collection.component';

const routes: Routes = [
  { path: 'books-search', component: BooksSearchComponent },
  { path: 'cart', component: CartComponent },
  { path: 'my-book-collection', component: CollectionComponent },
  { path: '', redirectTo: 'books-search', pathMatch: 'full' },
  { path: '**', redirectTo: 'books-search', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
