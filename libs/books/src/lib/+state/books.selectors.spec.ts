import { booksAdapter, BooksPartialState, initialState } from './books.reducer';

import * as BooksSelectors from './books.selectors';

import { Book } from '@app/shared';

describe('Books Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getBooksId = (book: Book) => book.id;

  const booksData = require('../assets/books.json');

  let state: BooksPartialState;

  beforeEach(() => {
    state = {
      books: booksAdapter.setAll(booksData, {
        ...initialState,
        selectedBookId: 'BHs2DwAAQBAJ',
        error: ERROR_MSG,
        isBooksLoaded: true,
        booksList: booksData,
      }),
    };
  });

  describe('Books Selectors', () => {
    it('getAllBooks() should return the list of Books', () => {
      const results = BooksSelectors.getAllBooks(state);
      const selectedId = getBooksId(results[0]);

      expect(results.length).toBe(3);
      expect(selectedId).toBe('BHs2DwAAQBAJ');
    });

    it('getSelected() should return the selected Entity', () => {
      const result = BooksSelectors.getSelectedBook(state) as Book;
      const selectedId = getBooksId(result);

      expect(selectedId).toBe('BHs2DwAAQBAJ');
    });

    it("getBooksLoaded() should return the current 'loaded' status", () => {
      const result = BooksSelectors.getBooksLoaded(state);

      expect(result).toBe(true);
    });

    it("getBooksError() should return the current 'error' state", () => {
      const result = BooksSelectors.getBooksError(state);

      expect(result).toBe(ERROR_MSG);
    });

    it('getSelectedBook() should return undefined when there is no selectedBookId', () => {
      state = {
        books: booksAdapter.setAll(booksData, {
          ...initialState,
          selectedBookId: '',
          error: ERROR_MSG,
          isBooksLoaded: true,
          booksList: booksData,
        }),
      };
      const result = BooksSelectors.getSelectedBook(state);

      expect(result).toBe(undefined);
    });

    it('getCartBooks() should return an empty array when books are not loaded', () => {
      state = {
        books: booksAdapter.setAll(booksData, {
          ...initialState,
          selectedBookId: '',
          error: ERROR_MSG,
          isBooksLoaded: false,
          booksList: [],
        }),
      };
      const result = BooksSelectors.getCartBooks(state);

      expect(result).toEqual([]);
    });

    it('getCollectionBooks() should return an empty array when books are not loaded', () => {
      state = {
        books: booksAdapter.setAll(booksData, {
          ...initialState,
          selectedBookId: '',
          error: ERROR_MSG,
          isBooksLoaded: false,
          booksList: [],
        }),
      };

      const result = BooksSelectors.getCollectionBooks(state);

      expect(result).toEqual([]);
    });

    it('getRecentSearch() should return an empty value when books are not loaded', () => {
      state = {
        books: booksAdapter.setAll(booksData, {
          ...initialState,
          selectedBookId: '',
          error: ERROR_MSG,
          isBooksLoaded: false,
          booksList: [],
          recentSearch: '',
        }),
      };

      const result = BooksSelectors.getRecentSearch(state);

      expect(result).toEqual('');
    });
  });
});
