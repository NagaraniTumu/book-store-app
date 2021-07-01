import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { BooksService } from './books.service';

import { BillingInfo, Book, Collection } from '../models/book.model';

import { BOOKS_API_URL } from '../constants/api.constants';

describe('BooksService', () => {
  let service: BooksService;
  let httpMock: HttpTestingController;

  const rawBooksData = require('../assets/books-raw.json');

  const booksData: Book[] = [
    {
      id: 'BHs2DwAAQBAJ',
      title: 'Learning Angular',
      subtitle: 'A Hands-On Guide to Angular 2 and Angular 4',
      authors: ['Brad Dayley', 'Brendan Dayley', 'Caleb Dayley'],
      publisher: 'Addison-Wesley Professional',
      description: 'Second Edition A Hands-On Guide to Angular 2',
      thumbnail: 'http://books.google.com/books/content?id=BHs2',
      pageCount: 240,
      language: 'un',
      price: 2232.93,
      currencyCode: 'INR',
      rating: 3,
    },
    {
      id: 'nLkrDwAAQBAJ',
      title: 'Angular Router',
      subtitle: 'Angular Router',
      authors: ['Victor Savkin'],
      publisher: 'Packt Publishing Ltd',
      description: 'Angular Router',
      thumbnail: 'http://books.google.com/books/content?id=nLkr',
      pageCount: 118,
      language: 'en',
      price: 2252.61,
      currencyCode: 'INR',
      rating: 5,
    },
  ];

  const billingInfo: BillingInfo = {
    fullName: 'testname',
    email: 'testname@yopmail.com',
    phoneNumber: '2345678901',
    address: 'sample address',
  };

  const collectionData: Collection[] = [
    {
      bookInfo: booksData[0],
      billingInfo: billingInfo,
    },
    {
      bookInfo: booksData[1],
      billingInfo: billingInfo,
    },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(BooksService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should getBooks method return list of books', () => {
    service.getBooks('angular').subscribe((books) => {
      expect(books.length).toBe(booksData.length);
      expect(books).toEqual(booksData);
    });

    const request = httpMock.expectOne(`${BOOKS_API_URL}angular`);
    expect(request.request.method).toBe('GET');
    request.flush(rawBooksData);
  });

  it('should getBooks method throw an error', () => {
    service.getBooks('angular').subscribe(
      () => {},
      (error) => {
        expect(error.status).toEqual(500);
        expect(error.statusText).toEqual('Internal Server Error');
      }
    );

    const testRequest = httpMock.expectOne(`${BOOKS_API_URL}angular`);
    testRequest.flush('error', {
      status: 500,
      statusText: 'Internal Server Error',
    });
  });

  it('should dispatchRecentSearch method publish recent search value', () => {
    service.recentSearch$.subscribe((recentSearch: string) => {
      expect(recentSearch).toEqual('angular');
    });
    service.dispatchRecentSearch('angular');
  });

  it('should dispatchRecentSearch method publish recent search value', () => {
    service.recentSearchResults$.subscribe((recentSearchResults: Book[]) => {
      expect(recentSearchResults).toEqual(booksData);
    });
    service.dispatchRecentSearchResults(booksData);
  });

  it('should dispatchSelectedBook method publish the selected book', () => {
    service.selectedBook$.subscribe((selectedBook: Book) => {
      expect(selectedBook).toEqual(booksData[0]);
    });
    service.dispatchSelectedbook(booksData[0]);
  });

  it('should dispatchBooksToCart method publish the books to cart', () => {
    service.cartBooks$.subscribe((cartBooks: Book[]) => {
      expect(cartBooks).toEqual(booksData);
    });
    service.dispatchBooksToCart(booksData);
  });

  it('should dispatchBooksToCollection method publish the books to collection', () => {
    service.myBookCollection$.subscribe((collection: Collection[]) => {
      expect(collection).toEqual(collectionData);
    });
    service.dispatchBooksToCollection(collectionData);
  });
});
