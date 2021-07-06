import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as BooksActions from './books.actions';

import { Book, Collection } from '@app/shared';

export const BOOKS_FEATURE_KEY = 'books';

export interface BooksState extends EntityState<Book> {
  isBooksLoaded: boolean;
  booksList: Book[];
  error?: any;
  recentSearch: string;
  selectedBookId: string | number;
  cartList: Book[];
  collectionList: Collection[];
}

export interface BooksPartialState {
  readonly [BOOKS_FEATURE_KEY]: BooksState;
}

export const booksAdapter: EntityAdapter<Book> = createEntityAdapter<Book>();

export const initialState: BooksState = booksAdapter.getInitialState({
  isBooksLoaded: false,
  booksList: [],
  cartList: [],
  collectionList: [],
  recentSearch: '',
  selectedBookId: '',
});

const booksReducer = createReducer(
  initialState,
  on(BooksActions.initBooks, (state) => ({
    ...state,
    isBooksLoaded: true,
    error: null,
  })),
  on(BooksActions.loadBooksSuccess, (state, { books }) => ({
    ...state,
    booksList: books,
    isBooksLoaded: true,
  })),
  on(BooksActions.loadBooksFailure, (state, { error }) => ({
    ...state,
    error,
    isBooksLoaded: false,
  })),
  on(BooksActions.updateRecentSearch, (state, { recentSearch }) => ({
    ...state,
    recentSearch: recentSearch,
    isBooksLoaded: true,
  })),
  on(BooksActions.updateSelectedBookId, (state, { selectedBookId }) => ({
    ...state,
    selectedBookId: selectedBookId,
    isBooksLoaded: true,
  })),
  on(BooksActions.updateCart, (state, { book }) => ({
    ...state,
    cartList: [...state.cartList, book],
    isBooksLoaded: true,
  })),
  on(BooksActions.removeSelectedBookFromCart, (state, { selectedBook }) => {
    const cartBooks = [...state.cartList];
    cartBooks.forEach((item, index) => {
      if (item.id === selectedBook.id) {
        cartBooks.splice(index, 1);
      }
    });

    return {
      ...state,
      cartList: cartBooks,
      isBooksLoaded: true,
    };
  }),
  on(BooksActions.clearCart, (state) => ({
    ...state,
    cartList: [],
    isBooksLoaded: true,
  })),
  on(BooksActions.updateCollection, (state, { collection }) => ({
    ...state,
    collectionList: [...state.collectionList, ...collection],
    isBooksLoaded: true,
  }))
);

export function reducer(state: BooksState | undefined, action: Action) {
  return booksReducer(state, action);
}
