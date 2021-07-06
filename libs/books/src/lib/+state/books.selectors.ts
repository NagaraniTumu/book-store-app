import { createFeatureSelector, createSelector } from '@ngrx/store';

import { BOOKS_FEATURE_KEY, BooksState } from './books.reducer';

export const getBooksState = createFeatureSelector<BooksState>(
  BOOKS_FEATURE_KEY
);

export const getBooksLoaded = createSelector(
  getBooksState,
  (state: BooksState) => state.isBooksLoaded
);

export const getBooksError = createSelector(
  getBooksState,
  (state: BooksState) => state.error
);

export const getAllBooks = createSelector(
  getBooksState,
  getBooksLoaded,
  (state: BooksState, isBooksLoaded) => {
    return isBooksLoaded ? state.booksList : [];
  }
);

export const getSelectedBookId = createSelector(
  getBooksState,
  (state: BooksState) => state.selectedBookId
);

export const getSelectedBook = createSelector(
  getAllBooks,
  getSelectedBookId,
  (books, selectedBookId) => {
    return selectedBookId
      ? books.find((book) => book.id === selectedBookId)
      : undefined;
  }
);

export const getCartBooks = createSelector(
  getBooksState,
  getBooksLoaded,
  (state: BooksState, isBooksLoaded) => {
    return isBooksLoaded ? state.cartList : [];
  }
);

export const getCollectionBooks = createSelector(
  getBooksState,
  getBooksLoaded,
  (state: BooksState, isBooksLoaded) => {
    return isBooksLoaded ? state.collectionList : [];
  }
);

export const getRecentSearch = createSelector(
  getBooksState,
  getBooksLoaded,
  (state: BooksState, isBooksLoaded) => {
    return isBooksLoaded ? state.recentSearch : '';
  }
);
