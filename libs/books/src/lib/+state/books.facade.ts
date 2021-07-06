import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';

import { Book, Collection } from '@app/shared';

import * as BooksActions from './books.actions';
import * as BooksSelectors from './books.selectors';

@Injectable()
export class BooksFacade {
  /**
   * Combine pieces of state using createSelector,
   * and expose them as observables through the facade.
   */
  booksLoaded$ = this.store.pipe(select(BooksSelectors.getBooksLoaded));
  allBooks$ = this.store.pipe(select(BooksSelectors.getAllBooks));
  selectedBook$ = this.store.pipe(select(BooksSelectors.getSelectedBook));
  cartBooks$ = this.store.pipe(select(BooksSelectors.getCartBooks));
  collectionBooks$ = this.store.pipe(select(BooksSelectors.getCollectionBooks));
  recentSearch$ = this.store.pipe(select(BooksSelectors.getRecentSearch));

  constructor(private store: Store) {}

  dispatchBooks(searchValue: string) {
    this.dispatchRecentSearch(searchValue);
    this.store.dispatch(BooksActions.initBooks({ recentSearch: searchValue }));
  }

  dispatchSelectedBookId(selectedBookId: string) {
    this.store.dispatch(
      BooksActions.updateSelectedBookId({ selectedBookId: selectedBookId })
    );
  }

  dispatchBooksToCart(selectedBook: Book) {
    this.store.dispatch(BooksActions.updateCart({ book: selectedBook }));
  }

  removeSelectedBookFromCart(selectedBook: Book) {
    this.store.dispatch(
      BooksActions.removeSelectedBookFromCart({ selectedBook: selectedBook })
    );
  }

  clearCart() {
    this.store.dispatch(BooksActions.clearCart());
  }

  dispatchBooksToCollection(purchasedBooks: Collection[]) {
    this.store.dispatch(
      BooksActions.updateCollection({ collection: purchasedBooks })
    );
  }

  dispatchRecentSearch(searchValue: string) {
    this.store.dispatch(
      BooksActions.updateRecentSearch({ recentSearch: searchValue })
    );
  }
}
