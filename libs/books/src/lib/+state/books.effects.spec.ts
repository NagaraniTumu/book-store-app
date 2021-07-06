import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { Observable, of } from 'rxjs';

import { NxModule, DataPersistence } from '@nrwl/angular';
import { cold, hot } from '@nrwl/angular/testing';

import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { BooksEffects } from './books.effects';
import * as BooksActions from './books.actions';

import { BooksService } from '@app/shared';

describe('BooksEffects', () => {
  let actions: Observable<any>;
  let effects: BooksEffects;

  const booksData = require('../assets/books.json');

  const booksServiceSpy = {
    getBooks: jest.fn(),
  };
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, NxModule.forRoot()],
      providers: [
        { provide: BooksService, useValue: booksServiceSpy },
        BooksEffects,
        DataPersistence,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.inject(BooksEffects);
  });

  it('should return a stream with book list', () => {
    booksServiceSpy.getBooks = jest.fn(() => of(booksData));

    actions = hot('-a-|', {
      a: BooksActions.initBooks({ recentSearch: 'angular' }),
    });
    const expected = hot('-a-|', {
      a: BooksActions.loadBooksSuccess({ books: booksData }),
    });
    expect(effects.init$).toBeObservable(expected);
  });

  it('should return a stream with book list as empty', () => {
    booksServiceSpy.getBooks = jest.fn(() => of([]));

    actions = hot('-a-|', {
      a: BooksActions.initBooks({ recentSearch: 'angular' }),
    });
    const expected = hot('-a-|', {
      a: BooksActions.loadBooksSuccess({ books: [] }),
    });
    expect(effects.init$).toBeObservable(expected);
  });

  it('should fail and return an action with the error', () => {
    const error = new Observable((subscriber) => subscriber.error(error));
    booksServiceSpy.getBooks = jest.fn(() => error);

    actions = hot('-a-|', {
      a: BooksActions.initBooks({ recentSearch: 'angular' }),
    });

    const expected = cold('-a-|', {
      a: BooksActions.loadBooksFailure({ error: error }),
    });
    expect(effects.init$).toBeObservable(expected);
  });
});
