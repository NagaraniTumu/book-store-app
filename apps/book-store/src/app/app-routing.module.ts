import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BooksSearchComponent } from './books-search/books-search.component';

const routes: Routes = [
  { path: 'books-search', component: BooksSearchComponent },
  {
    path: 'book-detail',
    loadChildren: () =>
      import(`./book-detail/book-detail.module`).then(
        (module) => module.BookDetailModule
      ),
  },
  {
    path: 'cart',
    loadChildren: () =>
      import(`./cart/cart.module`).then((module) => module.CartModule),
  },
  {
    path: 'my-book-collection',
    loadChildren: () =>
      import(`./collection/collection.module`).then(
        (module) => module.CollectionModule
      ),
  },
  { path: '', redirectTo: 'books-search', pathMatch: 'full' },
  { path: '**', redirectTo: 'books-search', pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      initialNavigation: 'enabled',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
