import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { NxModule } from '@nrwl/angular';
import { readFirst } from '@nrwl/angular/testing';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';

import { BooksEffects } from './books.effects';
import { BooksFacade } from './books.facade';
import * as BooksActions from './books.actions';
import {
  BOOKS_FEATURE_KEY,
  BooksState,
  reducer,
  initialState,
} from './books.reducer';

interface TestSchema {
  books: BooksState;
}

describe('BooksFacade', () => {
  let facade: BooksFacade;
  let store: Store<TestSchema>;

  const booksData = require('../assets/books.json');

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          HttpClientTestingModule,
          StoreModule.forFeature(BOOKS_FEATURE_KEY, reducer, { initialState }),
          EffectsModule.forFeature([BooksEffects]),
        ],
        providers: [BooksFacade],
      })
      class CustomFeatureModule {}

      @NgModule({
        imports: [
          NxModule.forRoot(),
          StoreModule.forRoot({}),
          EffectsModule.forRoot([]),
          CustomFeatureModule,
        ],
      })
      class RootModule {}
      TestBed.configureTestingModule({ imports: [RootModule] });

      store = TestBed.inject(Store);
      facade = TestBed.inject(BooksFacade);
    });

    /**
     * The initially generated facade::dispatchBooks() returns empty array
     */
    it('dispatchBooks() should return empty list with loaded == true', async (done) => {
      try {
        let list = await readFirst(facade.allBooks$);
        let isLoaded = await readFirst(facade.booksLoaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        facade.dispatchBooks('angular');

        list = await readFirst(facade.allBooks$);
        isLoaded = await readFirst(facade.booksLoaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(true);

        done();
      } catch (err) {
        done.fail(err);
      }
    });

    /**
     * Use `loadBooksSuccess` to manually update list
     */
    it('allBooks$ should return the loaded list; and loaded flag == true', async (done) => {
      try {
        let list = await readFirst(facade.allBooks$);
        let isLoaded = await readFirst(facade.booksLoaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        store.dispatch(
          BooksActions.loadBooksSuccess({
            books: booksData,
          })
        );

        list = await readFirst(facade.allBooks$);
        isLoaded = await readFirst(facade.booksLoaded$);

        expect(list.length).toBe(3);
        expect(isLoaded).toBe(true);

        done();
      } catch (err) {
        done.fail(err);
      }
    });

    it('cartBooks$ should return the books in cart', async (done) => {
      try {
        facade.dispatchBooksToCart(booksData[0]);

        const list = await readFirst(facade.cartBooks$);

        expect(list.length).toBe(1);

        done();
      } catch (err) {
        done.fail(err);
      }
    });

    it('collectionBooks$ should return the books in collection', async (done) => {
      try {
        facade.dispatchBooksToCollection(booksData);

        const list = await readFirst(facade.collectionBooks$);

        expect(list.length).toBe(3);

        done();
      } catch (err) {
        done.fail(err);
      }
    });

    it('selectedBook$ should return the selected book', async (done) => {
      try {
        store.dispatch(
          BooksActions.loadBooksSuccess({
            books: booksData,
          })
        );
        facade.dispatchSelectedBookId(booksData[0].id);

        const selectedBook = await readFirst(facade.selectedBook$);
        expect(selectedBook).toBe(booksData[0]);

        done();
      } catch (err) {
        done.fail(err);
      }
    });

    it('recentSearch$ should return the recent searched value', async (done) => {
      try {
        const searchValue = 'angular';
        facade.dispatchRecentSearch(searchValue);

        const search = await readFirst(facade.recentSearch$);

        expect(search).toBe(searchValue);

        done();
      } catch (err) {
        done.fail(err);
      }
    });

    it('removeSelectedBookFromCart() should remove selected book from cart', async (done) => {
      try {
        store.dispatch(
          BooksActions.updateCart({
            book: booksData[0],
          })
        );

        facade.removeSelectedBookFromCart(booksData[0]);

        const list = await readFirst(facade.cartBooks$);

        expect(list.length).toBe(0);

        done();
      } catch (err) {
        done.fail(err);
      }
    });

    it('clearCart() should remove books from cart', async (done) => {
      try {
        facade.clearCart();

        const list = await readFirst(facade.cartBooks$);

        expect(list).toEqual([]);

        done();
      } catch (err) {
        done.fail(err);
      }
    });
  });
});
