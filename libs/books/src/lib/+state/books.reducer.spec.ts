import * as BooksActions from './books.actions';
import { BooksState, initialState, reducer } from './books.reducer';

describe('Books Reducer', () => {
  const booksData = require('../assets/books.json');

  describe('valid Books actions', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });

    it('loadBooksSuccess should return the list of known Books', () => {
      const action = BooksActions.loadBooksSuccess({ books: booksData });

      const result: BooksState = reducer(initialState, action);

      expect(result.isBooksLoaded).toBe(true);
      expect(result.booksList.length).toBe(3);
    });

    it('loadBooksFailure should return an error', () => {
      const error = new Error();
      const action = BooksActions.loadBooksFailure({ error });

      const result: BooksState = reducer(initialState, action);

      expect(result).toEqual({
        ...initialState,
        error,
        isBooksLoaded: false,
      });
    });

    it('updateRecentSearch should update recent search value', () => {
      const searchValue = 'angular';
      const action = BooksActions.updateRecentSearch({
        recentSearch: searchValue,
      });

      const result: BooksState = reducer(initialState, action);

      expect(result).toEqual({
        ...initialState,
        recentSearch: searchValue,
        isBooksLoaded: true,
      });
    });

    it('updateSelectedBookId should update selected book id', () => {
      const selectedId = booksData[0].id;

      const action = BooksActions.updateSelectedBookId({
        selectedBookId: selectedId,
      });

      const result: BooksState = reducer(initialState, action);

      expect(result).toEqual({
        ...initialState,
        selectedBookId: selectedId,
        isBooksLoaded: true,
      });
    });

    it('updateCart should update/add list of books in cart', () => {
      const selectedBook = booksData[0];
      const action = BooksActions.updateCart({
        book: selectedBook,
      });

      const result: BooksState = reducer(initialState, action);

      expect(result).toEqual({
        ...initialState,
        cartList: [selectedBook],
        isBooksLoaded: true,
      });
    });

    it('updateCollection should update/add list of books in cart', () => {
      const myBooksCollection = [booksData[1], booksData[2]];
      const action = BooksActions.updateCollection({
        collection: myBooksCollection,
      });

      const result: BooksState = reducer(initialState, action);

      expect(result).toEqual({
        ...initialState,
        collectionList: myBooksCollection,
        isBooksLoaded: true,
      });
    });

    it('clearCart should remove books from cart', () => {
      const action = BooksActions.clearCart();

      const result: BooksState = reducer(initialState, action);

      expect(result).toEqual({
        ...initialState,
        cartList: [],
        isBooksLoaded: true,
      });
    });

    it('removeSelectedBookFromCart should remove selected book from cart', () => {
      initialState.cartList = booksData;
      const action = BooksActions.removeSelectedBookFromCart({
        selectedBook: booksData[0],
      });

      const result: BooksState = reducer(initialState, action);

      expect(result).toEqual({
        ...initialState,
        cartList: [booksData[1], booksData[2]],
        isBooksLoaded: true,
      });
    });
  });
});
