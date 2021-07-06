import { createAction, props } from '@ngrx/store';

import { Book, Collection } from '@app/shared';

export const initBooks = createAction(
  '[Books Page] Init',
  props<{ recentSearch: string }>()
);

export const loadBooksSuccess = createAction(
  '[Books/API] Load Books Success',
  props<{ books: Book[] }>()
);

export const loadBooksFailure = createAction(
  '[Books/API] Load Books Failure',
  props<{ error: any }>()
);

export const updateRecentSearch = createAction(
  '[Books/API] Update Recent Search',
  props<{ recentSearch: string }>()
);

export const updateSelectedBookId = createAction(
  '[Books/API] Update Selected Book',
  props<{ selectedBookId: string }>()
);

export const updateCart = createAction(
  '[Books/API] Update Cart',
  props<{ book: Book }>()
);

export const removeSelectedBookFromCart = createAction(
  '[Book/API] Remove Book From Cart',
  props<{ selectedBook: Book }>()
);

export const clearCart = createAction('[Book/API] Remove Items From Cart');

export const updateCollection = createAction(
  '[Books/API] Update Collection',
  props<{ collection: Collection[] }>()
);
