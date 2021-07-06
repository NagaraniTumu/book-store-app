import { Injectable } from '@angular/core';
import { fetch } from '@nrwl/angular';
import { createEffect, Actions, ofType } from '@ngrx/effects';

import { map } from 'rxjs/operators';

import { Book, BooksService } from '@app/shared';

import * as BooksActions from './books.actions';

@Injectable()
export class BooksEffects {
  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BooksActions.initBooks),
      fetch({
        run: (action) => {
          return this._booksService.getBooks(action.recentSearch).pipe(
            map((data: Book[]) => {
              return BooksActions.loadBooksSuccess({ books: data });
            })
          );
        },
        onError: (action, error) => {
          return BooksActions.loadBooksFailure({ error });
        },
      })
    )
  );

  constructor(private actions$: Actions, private _booksService: BooksService) {}
}
